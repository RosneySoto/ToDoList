const shopCarModel = require('../../model/shopCarModel');
const wishListModel = require('../../model/wishListModel');
const usersModel = require('../../model/userModel');

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
    
                if (existingProductIndex !== -1) {
                    // Si el producto ya está en el carrito, actualizar la cantidad y los puntos
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

    // static async updateTask(id, updatedTaskData){
    //     try {
    //         const updatedTask = await tasksModel.findByIdAndUpdate(id, {
    //             $set: updatedTaskData
    //         },{
    //             new: true
    //         });
    //         return updatedTask;
    //     } catch (error) {
    //         console.log('[ERROR]-> Error al actualizar la tarea:', error);
    //     };
    // };

    // static async deleteTask (id){
    //     try {
    //         const taskDelete = await tasksModel.findByIdAndDelete({_id: id});
    //         return taskDelete;
    //     } catch (error) {
    //         console.log('[ERROR] -> Error al eliminar tarea', error);
    //     };
    // };

    // static async finishTask(id, createdByUserId) {
    //     try {
    //         const resultTask = await tasksModel.findById(id);
    
    //         if (resultTask && resultTask.active === true) {

    //             // Verifica que la tarea no tenga usuario asignados, si no tiene usuarios la puede finalizar cualquier usuario y se le guardan los puntos.
    //             if(resultTask.assignedUser === null) {

    //                 let updatedTaskComplete = await tasksModel.findByIdAndUpdate(id, {
    //                     completionDate: Date.now(),
    //                     active: false,
    //                     assignedUser: createdByUserId
    //                 }, { new: true });

    //                 const assignedUserComplete = await usersModel.findByIdAndUpdate(createdByUserId, {
    //                     $inc: { points: resultTask.pointsTask }
    //                 }, { new: true });

    //                 return { updatedTaskComplete, assignedUserComplete };

    //             } else {
    //                 // Verifica que el usuario que intenta finalizar la tarea sea el que la creo, solo el la puede terminar
    //                 if (createdByUserId != resultTask.userId) {
    //                     throw new Error('No tienes permisos para finalizar esta tarea');
    //                 };
    
    //                 let updatedTask = await tasksModel.findByIdAndUpdate(id, {
    //                     completionDate: Date.now(),
    //                     active: false
    //                 }, { new: true });
    
    //                 // Incrementa los puntos del usuario asignado
    //                 const assignedUser = await usersModel.findByIdAndUpdate(resultTask.assignedUser, {
    //                     $inc: { points: resultTask.pointsTask }
    //                 }, { new: true });
        
    //                 return { updatedTask, assignedUser };
    //             };

    //         } else {
    //             console.log('No se encontraron tareas a modificar');
    //             return null;
    //         };

    //     } catch (error) {
    //         console.log('[ERROR]-> Error al finalizar la tarea', error);
    //         throw error;
    //     }
    // };

    // static async openTask (id){
    //     try {
    //         const resultId = await tasksModel.findById(id);

    //         if(resultId && resultId.active === false){
    //             let taskId = await tasksModel.findByIdAndUpdate(id, 
    //                 {active: true},
    //                 {new: true});
    //             return { taskId }
    //         } else {
    //             console.log('No se encontraron tareas a modificar');
    //         }
    //     } catch (error) {
    //         console.log('[ERROR]-> Error al abrir la tarea', error);
    //         throw error;
    //     }
    // }

    // static async getTaskById (id){
    //     try {
    //         if(!id){
    //             console.log('No se selecciono la tarea');
    //             return null;
    //         }
    //         const task = tasksModel.findById(id)
    //             .populate({
    //                 path: 'userId assignedUser priorityId',
    //                 select: '-_id name lastname'
    //             });
    //         if(!task){
    //             console.log('No se encontro la tarea seleccionada')
    //             return null;
    //         } else {
    //             return task
    //         }
    //     } catch (error) {
    //         console.log('[ERROR]-> Error al buscar tarea por ID', error);
    //         throw error;
    //     }
    // }
};

module.exports = ContainerShopCar;