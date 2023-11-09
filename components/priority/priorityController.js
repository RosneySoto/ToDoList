const ContainerPriority = require('./priorityService');

const listPriority = async (req, res) => {
    try {
        const list = await ContainerPriority.getPrioritys();
        res.send({prioritys: list});
    } catch (error) {
        console.log('No se pueden mostrar las tareas');
    };
};

const addPriority = async (req, res) => {
    try {
        const newPriority = req.body;
        if(!newPriority){
            res.send('Debe ingresar una nueva prioridad');
        } else {
            prioritySave = await ContainerPriority.addPriority(newPriority);
        }
        const list = await ContainerPriority.getPrioritys();
        res.send({prioritys: list});
    } catch (error) {
        console.log('Error al crear una nueva prioridad');
        res.send('Error al crear la prioridad', error);
    }
};

const getTaskByPriority = async (req, res) => {
    const id = req.params.id;
    try {
        const priorityFind = await ContainerPriority.getTaskByPriority(id);
        res.send({allTask: priorityFind});
    } catch (error) {
        res.status(500).send('Error');
        console.log('Error al listar las tareas por ID de prioridad', error);
    };
};

module.exports = {
    listPriority,
    addPriority,
    getTaskByPriority
}