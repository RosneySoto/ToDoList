const tasksModel = require('../../model/taskDB');
const usersModel = require('../../model/userModel');

class ContainerTasks {
    
    static getTask(){
        try {
            const listTask = tasksModel.find().populate({
                path: 'userId assignedUser priorityId',
                select: '_id name lastname'
            });
            if(!listTask) {
                console.log('Error al listar las tareas');
            } else {
                return listTask;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al mostrar la lista de tareas');
        };
    };

    static addTask(task, userId){
        try {
            const newTask = tasksModel({
                title: task.title,
                detail: task.detail,
                priorityId: task.priorityId,
                userId: userId,
                assignedUser: task.assignedUser,
                pointsTask: task.pointsTask
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

    static async finishTask(id, createdByUserId) {
        try {
            const resultTask = await tasksModel.findById(id);
    
            if (resultTask && resultTask.active === true) {

                // Verifica que la tarea no tenga usuario asignados, si no tiene usuarios la puede finalizar cualquier usuario y se le guardan los puntos.
                if(resultTask.assignedUser === null) {

                    let updatedTaskComplete = await tasksModel.findByIdAndUpdate(id, {
                        completionDate: Date.now(),
                        active: false,
                        assignedUser: createdByUserId
                    }, { new: true });

                    const assignedUserComplete = await usersModel.findByIdAndUpdate(createdByUserId, {
                        $inc: { points: resultTask.pointsTask }
                    }, { new: true });

                    return { updatedTaskComplete, assignedUserComplete };

                } else {
                    // Verifica que el usuario que intenta finalizar la tarea sea el que la creo, solo el la puede terminar
                    if (createdByUserId != resultTask.userId) {
                        throw new Error('No tienes permisos para finalizar esta tarea');
                    };
    
                    let updatedTask = await tasksModel.findByIdAndUpdate(id, {
                        completionDate: Date.now(),
                        active: false
                    }, { new: true });
    
                    // Incrementa los puntos del usuario asignado
                    const assignedUser = await usersModel.findByIdAndUpdate(resultTask.assignedUser, {
                        $inc: { points: resultTask.pointsTask }
                    }, { new: true });
        
                    return { updatedTask, assignedUser };
                };

            } else {
                console.log('No se encontraron tareas a modificar');
                return null;
            };

        } catch (error) {
            console.log('[ERROR]-> Error al finalizar la tarea', error);
            throw error;
        }
    };

    static async openTask (id){
        try {
            const resultId = await tasksModel.findById(id);

            if(resultId && resultId.active === false){
                let taskId = await tasksModel.findByIdAndUpdate(id, 
                    {active: true},
                    {new: true});
                return { taskId }
            } else {
                console.log('No se encontraron tareas a modificar');
            }
        } catch (error) {
            console.log('[ERROR]-> Error al abrir la tarea', error);
            throw error;
        }
    }

    static async getTaskById (id){
        try {
            if(!id){
                console.log('No se selecciono la tarea');
                return null;
            }
            const task = tasksModel.findById(id)
                .populate({
                    path: 'userId assignedUser priorityId',
                    select: '-_id name lastname'
                });
            if(!task){
                console.log('No se encontro la tarea seleccionada')
                return null;
            } else {
                return task
            }
        } catch (error) {
            console.log('[ERROR]-> Error al buscar tarea por ID', error);
            throw error;
        }
    }
};

module.exports = ContainerTasks;