const tasksModel = require('../../model/taskDB');

class ContainerTasks {
    
    static getTask(){
        try {
            const listTask = tasksModel.find();
            if(!listTask) {
                console.log('Error al listar las tareas');
            } else {
                return listTask;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al mostrar la lista de tareas');
        };
    };

    static addTask(task){
        try {
            const newTask = tasksModel({
                title: task.title,
                detail: task.detail,
                priorityId: task.priorityId,
                userId: task.userId,
                assignedUser: task.assignedUser
            });
            return newTask.save();
        } catch (error) {
            console.log('[ERROR]-> Error al agregar la nueva tarea', error);
        }
        
    };

    static async updateTask(id, updatedTaskData){
        try {
            const updatedTask = await tasksModel.findByIdAndUpdate(id, {
                $set: updatedTaskData
            },{
                new: true
            });
            // console.log(updatedTaskData); // Puedes imprimir la tarea actualizada aquí si lo necesitas
            return updatedTask;
        } catch (error) {
            console.log('[ERROR]-> Error al actualizar la tarea:', error);
        };
    };

    static async deleteTask (id){
        try {
            const taskDelete = await tasksModel.findByIdAndDelete({_id: id});
            return taskDelete;
        } catch (error) {
            console.log('[ERROR] -> Error al eliminar tarea', error);
        };
    };

    static async finishTask (id){
        try {
            const resultId = await tasksModel.findById(id);
            if(resultId && resultId.active === true){
                let taskId = await tasksModel.findByIdAndUpdate(id, 
                    {active: false},
                    {new: true});
                console.log('Se desactiva la tarea');

            }else if (resultId && resultId.active === false){
                let taskId = await tasksModel.findByIdAndUpdate(id, 
                    {active: true},
                    {new: true});
               console.log('Se activa la tarea');
            } else {
                console.log('No se encontraron tareas a modificar');
            }
            return resultId;
        } catch (error) {
            console.log('[ERROR]-> Error al finalizar la tarea', error);
        }
    }
};

module.exports = ContainerTasks;