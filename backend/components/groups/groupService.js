const groupModel = require('../../model/groupModel');

class ContainerGroup {

    static addGroup(group){
        try {
            const newGroup = groupModel({
                nameGroup: group.nameGroup
            });
            return newGroup.save();
        } catch (error) {
            console.log('[ERROR]-> No se creo el grupo', error);
        };
    };

    static getGroups(){
        try {
            const listGroup = groupModel.find();
            if(!listGroup) {
                console.log('Error al listar los grupos');
            } else {
                return listGroup;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al mostrar la lista de los grupos');
        };
    };

    static async deleteGroup (id){
        try {
            const groupDelete = await groupModel.findByIdAndDelete({_id: id});
            return groupDelete;
        } catch (error) {
            console.log('[ERROR] -> Error al eliminar el grupo', error);
        };
    };

    static async getGroupById (id){
        try {
            const group = groupModel.findById(id);
            if(!id){
                console.log('El grupo no existe')
            } else {
                return group;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al buscar usuario por ID', error);
            throw error;
        }
    };
};

module.exports = ContainerGroup;