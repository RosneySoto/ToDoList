const wishListModel = require('../../model/wishListModel');

class ContainerWishList {

    static addWish(wish, userId){
        try {
            const wishNew = wishListModel({
                title: wish.title,
                detail: wish.detail,
                createUserId: userId,
                points: wish.points
            });
            return wishNew.save();
        } catch (error) {
            console.log('[ERROR]-> Error al agregar un nuevo deseo', error);
        };
    };

    static getWishs(){
        try {
            const wishList = wishListModel.find().populate({
                path: 'createUserId',
                select: '_id name lastname'
            });
            if(!wishList) {
                console.log('Error al listar las tareas');
            } else {
                return wishList;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al mostrar la lista de tareas');
        };
    };

    static async updateWish(id, updatedWishData){
        try {
            const updatedWish = await wishListModel.findByIdAndUpdate(id, {
                $set: updatedWishData
            },{
                new: true
            });
            return updatedWish;
        } catch (error) {
            console.log('[ERROR]-> Error al actualizar el iten ', error);
        };
    };

    static async deleteWish (id){
        try {
            const wishDelete = await wishListModel.findByIdAndDelete({_id: id});
            return wishDelete;
        } catch (error) {
            console.log('[ERROR] -> Error al eliminar el deseo', error);
        };
    };

    static async getwishById (id){
        try {
            if(!id){
                console.log('No se selecciono la tarea');
                return null;
            }
            const wish = wishListModel.findById(id)
                .populate({
                    path: 'createUserId',
                    select: '_id name lastname'
                });
            if(!wish){
                console.log('No se encontro el deseo seleccionado')
                return null;
            } else {
                return wish;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al buscar el deseo por ID', error);
            throw error;
        };
    };

};

module.exports = ContainerWishList;