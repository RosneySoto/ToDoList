const ContainerPriority = require('./priorityService');

const listPriority = async (req, res) => {
    try {
        const list = await ContainerPriority.getPrioritys();
        res.status(200).json({prioritys: list});
    } catch (error) {
        console.log('No se pueden mostrar las tareas');
    };
};

const addPriority = async (req, res) => {
    try {
        const newPriority = req.body;
        if(!newPriority){
            res.status(404).json('Debe ingresar una nueva prioridad');
        } else {
            prioritySave = await ContainerPriority.addPriority(newPriority);
        }
        const list = await ContainerPriority.getPrioritys();
        res.status(201).json({prioritys: list});
    } catch (error) {
        console.log('Error al crear una nueva prioridad');
        res.status(500).json('Error al crear la prioridad', error);
    }
};

const getTaskByPriority = async (req, res) => {
    const id = req.params.id;
    try {
        const priorityFind = await ContainerPriority.getTaskByPriority(id);
        res.status(200).json({allTask: priorityFind});
    } catch (error) {
        res.status(500).json('Error');
        console.log('Error al listar las tareas por ID de prioridad', error);
    };
};

module.exports = {
    listPriority,
    addPriority,
    getTaskByPriority
}