const shopCarModel = require('../../model/shopCarModel');
const wishListModel = require('../../model/wishListModel');
const usersModel = require('../../model/userModel');
const processCarModel = require('../../model/processCarModel');
const {enviarMail} = require('../../middleware/nodemailer');
const mongoose = require('mongoose');

class ContainerShopCar {
    
    static async getAllShop(){
        try {
            const allShop = await shopCarModel.find()
                .populate({
                    path: 'items.deseoId userId',
                    select: '-_id title detail name lastname'
                });
    
            if (!allShop || allShop.length === 0) {
                console.log('No se encontraron datos en el carrito');
                return []; // Devolver un array vacío o algún valor por defecto
            } else {
                return allShop;
            }
        } catch (error) {
            console.log('[ERROR]-> Error al mostrar la lista de deseos', error);
            throw error; // Propagar el error para que se maneje en el controlador
        }
    };

    static async addToCar(wish, userId) {
        try {
            const wishId = new mongoose.Types.ObjectId(wish.deseoId);
            const product = await wishListModel.findById(wishId);
    
            if (!product) {
                throw new Error('Producto no encontrado en la lista de deseos');
            }
    
            const car = await shopCarModel.findOne({ userId: userId, isOpen: true });
    
            if (car) {
                // Buscar si el producto ya está en el carrito
                const existingProductIndex = car.items.findIndex(item => item.deseoId.equals(wish.deseoId));
    
                if (existingProductIndex !== -1) {
                    // Si el producto ya está en el carrito, actualizar la cantidad y los puntos
                    //Los corchetes indican la posicion del array
                    car.items[existingProductIndex].amount += wish.amount;
                    car.items[existingProductIndex].total_Points += wish.amount * product.points;
                } else {
                    // Si el producto no está en el carrito, agregarlo como un nuevo elemento
                    car.items.push({
                        deseoId: wish.deseoId,
                        amount: wish.amount,
                        total_Points: wish.amount * product.points
                    });
                }
    
                // Recalcular el totalPoints en tiempo real
                car.total_Points_Car = car.items.reduce((total, item) => total + item.total_Points, 0);
    
                // Guardar los cambios en el carrito
                return await car.save();
            } else {
                // Si no hay carrito abierto, crear uno nuevo con el producto
                const newAddToCar = new shopCarModel({
                    items: [
                        {
                            deseoId: wish.deseoId,
                            amount: wish.amount,
                            total_Points: wish.amount * product.points
                        }
                    ],
                    userId: userId,
                    isOpen: true
                });
    
                // Establecer el totalPoints inicial
                newAddToCar.totalPoints = newAddToCar.items[0].total_Points;
    
                return newAddToCar.save();
            }
        } catch (error) {
            console.log('Error al agregar producto al carrito', error);
            throw error;
        };
    };

    static async deleteWishCar(deseoId, carId, userId) {
        try {
            const car = await shopCarModel.findOne({ _id: carId, userId: userId, isOpen: { $eq: true } });
    
            if (car) {
    
                const existingProductIndex = car.items.findIndex(item => item.deseoId.equals(deseoId.deseoId));
    
                if (existingProductIndex !== -1) {
                    if (car.items[existingProductIndex].amount > 1) {
                        car.items[existingProductIndex].amount -= 1;
                        car.items[existingProductIndex].total_Points -= car.items[existingProductIndex].total_Points / (car.items[existingProductIndex].amount + 1);
                    } else {
                        // Eliminar el producto del carrito si la cantidad es 1
                        car.items.splice(existingProductIndex, 1);
                    }
    
                    // Recalcular el totalPoints en tiempo real
                    car.total_Points_Car = car.items.reduce((total, item) => total + item.total_Points, 0);
    
                    // Guardar los cambios en el carrito
                    return await car.save();
                } else {
                    console.log('No se encontró el deseo en el carrito');
                    return {message: 'No se encontró el deseo en el carrito', car};
                }
            } else {
                console.log('No hay carrito vigente o no existe');
                return {message: 'El carrito no está vigente o no existe'};
            }
        } catch (error) {
            console.log('[ERROR] -> Error al eliminar deseo del carrito', error);
            throw error;
        }
    };

    static async deleteShopCar (id){
        try {
            const shopDelete = await shopCarModel.findByIdAndDelete({_id: id});
            return shopDelete;
        } catch (error) {
            console.log('[ERROR] -> Error al eliminar tarea', error);
        };
    };

    static async processAndPuchaseCar (idCar){
        try {
            //Busca el carrito en la base de datos
            const car = await shopCarModel.findById(idCar).populate({
                path: 'items',
                populate: {
                    path: 'deseoId',
                    select: 'title detail points'
                }
            });

            const carDetails = {
                userId: car.userId,
                total_Points_Car: car.total_Points_Car,
                items: car.items.map(item => ({
                    title: item.deseoId.title,
                    detail: item.deseoId.detail,
                    points: item.deseoId.points,
                    amount: item.amount,
                    total_Points: item.total_Points,
                    _id: item._id
                }))
            };

            if(car.isOpen) {
                //Recupera el monto total del carrito
                const totalPointsInCar = car.total_Points_Car;
    
                //Busca el usuario asociado al carrito y recupera los puntos.
                const user = await usersModel.findById(car.userId);
                const userPoints = user.points;
    
                //Validacion para saber si los puntos del usuario con suficientes para hacer la compa
                if( userPoints >= totalPointsInCar){
                    const resultPoints = userPoints - totalPointsInCar;
    
                    //updatear los puntos del usuario guardar los puntos restados.
                    const userUpdated = await usersModel.findByIdAndUpdate( user, {
                        $set: {points: resultPoints}
                    }, {new: true} );

                    //Cambia el campo de isOpen a false para indicar que el carrito ya se cerro o se compro
                    await shopCarModel.findByIdAndUpdate( car, {
                        $set: {isOpen: false}
                    }, {new: true});

                } else {
                    throw new Error('No tienes puntos suficientes para canjear');
                    // console.log('No tienes puntos suficientes para canjear');
                }
    
                // Se crea un objeto y se guarda en la base de datos de carritos procesados
                const carFinish = new processCarModel({
                    idCar: car.id,
                    pointValue: totalPointsInCar,
                    purchase_date: new Date()
                });
    
                await carFinish.save();

                //Envio de mail al usuario
                const mailOptions = {
                from: process.env.APP_MAIL_NODEMAILER, //Se debe crear un mail generico para hacer los envios de los mails a los usuarios
                to: process.env.APP_MAIL_NODEMAILER,
                subject: 'Detalles del Carrito de Compras',
                html: `
                    <h1>Detalles del carrito:</h1>
                    <p>Usuario: ${carDetails.userId}</p>
                    <p>Total de Puntos: ${carDetails.total_Points_Car}</p>
                    <ul>
                        ${carDetails.items.map(item => `
                            <li>
                                Producto: ${item.title}<br>
                                Detalle: ${item.detail}<br>
                                Puntos: ${item.points}<br>
                                Cantidad: ${item.amount}<br>
                                Total de Puntos: ${item.total_Points}<br>
                            </li>
                        `).join('')}
                    </ul>
                `
            };
            // Envía el correo electrónico al usuario
            await enviarMail(mailOptions);
    
                return carFinish
            } else {
                throw new Error('El carrito está finalizado');
            };

        } catch (error) {
            console.log('Error en el servidor');
            throw error;
        }
        

    }

};

module.exports = ContainerShopCar;