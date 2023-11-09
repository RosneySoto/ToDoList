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
    const id = req.params.id;
    try {
        const result = await ContainerTasks.finishTask(id);
        res.send({taskFinish: result})
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
};