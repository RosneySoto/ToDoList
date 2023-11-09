const { default: mongoose } = require('mongoose');
const priorityModel = require('../../model/priorityTask');
const taskModel = require('../../model/taskDB');

class ContainerPriority {

    static getPrioritys(){
        try {
            const listPrioriry = priorityModel.find();
            if(!listPrioriry) {
                console.log('Error al listar las prioridades');
            } else {
                return listPrioriry;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al mostrar la lista de prioridades');
        };
    };

    static addPriority(priority){
        try {
            const newPriority = priorityModel({
                name: priority.name
            });
            return newPriority.save();
        } catch (error) {
            console.log('[ERROR]-> No se creo la prioridad', error);
        };
    };

    static async getTaskByPriority (id){
        try {
            const allTaskList = taskModel.find({ priorityId: id }).populate('priorityId', 'name');
            return allTaskList;
        } catch (error) {
            console.log('[ERROR]-> Error al buscar las tareas por prioridad');
            throw error;
        };
    };
};

module.exports = ContainerPriority;