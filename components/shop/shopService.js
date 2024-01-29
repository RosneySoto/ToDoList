const shopCarModel = require('../../model/shopCarModel');
const wishListModel = require('../../model/wishListModel');
const usersModel = require('../../model/userModel');
const { ObjectId } = require('mongoose').mongo;

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
            const product = await wishListModel.findById(wish.deseoId);
    
            if (!product) {
                throw new Error('Producto no encontrado en la lista de deseos');
            }
    
            const car = await shopCarModel.findOne({ userId: userId, isOpen: true });
    
            if (car) {
                // Buscar si el producto ya está en el carrito
                const existingProductIndex = car.items.findIndex(item => item.deseoId.equals(wish.deseoId));
                console.log('[DATA]' + existingProductIndex);
    
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
    }
    

    static async deleteShopCar (id){
        try {
            const shopDelete = await shopCarModel.findByIdAndDelete({_id: id});
            return shopDelete;
        } catch (error) {
            console.log('[ERROR] -> Error al eliminar tarea', error);
        };
    };

};

module.exports = ContainerShopCar;