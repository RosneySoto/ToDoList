const ContainerTasks = require('../task/tasksService');

const listTask = async (req, res) => {
    try {
        const lisTask = await ContainerTasks.getTask();
        res.send({task: lisTask});
    } catch (error) {
        console.log('No se pueden mostrar las tareas');
    };
};

const addTask = async (req, res) => {
    try {
        const newTask = req.body;
        if(!newTask){
            res.send('No se registro tarea')
        } else {
            taskSave = await ContainerTasks.addTask(newTask);
        }
        res.send({newTask: taskSave});
    } catch (error) {
        console.log('Error al crear la nueva tarea');
    };
};

const updateTask = async (req, res) => {
    const id = req.params.id;
    const taskUpdate = req.body;

    try {
        const updatedTask = await ContainerTasks.updateTask(id, taskUpdate);
        res.send({taskUpdate: updatedTask});
    } catch (error) {
        console.log('Error al editar la tarea', error);
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    };
};

const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const taskDelete = await ContainerTasks.deleteTask(id)
        res.send('Tarea eliminada correctamente')
    } catch (error) {
        console.log('[ERROR]-> Hubo un error, intente mas tarde', error)
    };
};

const finishTask = async (req, res) => {
    const taskId = req.params.id;
    const createdByUserId = req.session.user.id;
    console.log(createdByUserId);

    try {
        const result = await ContainerTasks.finishTask(taskId, createdByUserId);
        if (result) {
            res.json({ message: 'Tarea completada exitosamente', result });
        } else {
            res.status(404).json({ error: 'No se encontró la tarea activa con el ID proporcionado' });
        }
    } catch (error) {
        if (error.message === 'No tienes permisos para finalizar esta tarea') {
            res.status(403).json({ error: 'No tienes permisos para finalizar esta tarea, debe ser finalizada por el usuario que la creó.' });
        } else {
            console.error('[ERROR] -> Hubo un error al completar la tarea', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

const openTask = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await ContainerTasks.openTask(id);
        res.send({taskOpen: result})
    } catch (error) {
        console.log('[ERROR]-> Hubo un error, intente mas tarde', error);
    }
}

module.exports = {
    listTask,
    addTask,
    updateTask,
    deleteTask,
    finishTask,
    openTask
};