const ContainerTasks = require('../task/tasksService');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const listTask = async (req, res) => {
    try {
        const lisTask = await ContainerTasks.getTask();
        res.status(200).json({task: lisTask});
        // res.render('index');
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('No se pueden mostrar las tareas');
    };
};

const addTask = async (req, res) => {
    try {
        const newTask = req.body;
        console.log(newTask);
        if(!newTask){
            res.status(404).json('No se registro tarea')
        } else {
            const token = req.headers.authorization.split(' ')[1];
            // Decodificar el token para obtener el ID del usuario
            const decodedToken = jwt.verify(token, JWT_SECRET);
            const userId = decodedToken.id;

            newTask.userId = userId;

            taskSave = await ContainerTasks.addTask(newTask, userId);
        }
        res.status(201).json({newTask: taskSave});
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('Error al crear la nueva tarea');
    };
};

const updateTask = async (req, res) => {
    const id = req.params.id;
    const taskUpdate = req.body;

    try {
        const updatedTask = await ContainerTasks.updateTask(id, taskUpdate);
        res.status(200).json({taskUpdate: updatedTask});
        console.log(updatedTask);
    } catch (error) {
        console.log('Error al editar la tarea', error);
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    };
};

const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const taskDelete = await ContainerTasks.deleteTask(id)
        console.log(taskDelete);
        res.status(200).json('Tarea eliminada correctamente')
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('[ERROR]-> Hubo un error, intente mas tarde', error)
    };
};

const finishTask = async (req, res) => {
    const taskId = req.params.id;
    console.log('[ID ES] => ' + taskId);
    // const createdByUserId = req.session.user.id;
    const createdByUserId = req.userId;
    console.log(createdByUserId);

    try {
        const result = await ContainerTasks.finishTask(taskId, createdByUserId);
        if (result) {
            res.status(200).json({ message: 'Tarea completada exitosamente', result });
        } else {
            res.status(404).json({ error: 'No se encontró la tarea activa con el ID proporcionado' });
        };
    } catch (error) {
        if (error.message === 'No tienes permisos para finalizar esta tarea') {
            res.status(403).json({ error: 'No tienes permisos para finalizar esta tarea, debe ser finalizada por el usuario que la creó.' });
        } else {
            console.error('[ERROR] -> Hubo un error al completar la tarea', error);
            res.status(500).json({ error: 'Internal Server Error' });
        };
    };
};

const openTask = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await ContainerTasks.openTask(id);
        res.status(200).json({taskOpen: result})
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('[ERROR]-> Hubo un error, intente mas tarde', error);
    }
}

const getTaskbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const taskById = await ContainerTasks.getTaskById(id);
        
        if(!taskById){
            res.status(404).json('Error no se encontro la tarea que quieres buscar');
        } else {
            res.status(200).json({TaskById: taskById});
        };
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('[ERROR]-> Error en el controlador al buscar tarea por ID', error);
            throw error;
    };
};

module.exports = {
    listTask,
    addTask,
    updateTask,
    deleteTask,
    finishTask,
    openTask,
    getTaskbyId
};