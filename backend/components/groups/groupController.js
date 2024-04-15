const ContainerGroup = require('./groupService');

const listGroup = async (req, res) => {
    try {
        const grups = await ContainerGroup.getGroups();
        res.status(200).json({Grups: grups});
    } catch (error) {
        console.log('No se pueden mostrar los grupos');
    };
};

const addGroup = async (req, res) => {
    try {
        const newGroup = req.body;
        if(!newGroup){
            res.status(404).json('Debe ingresar nombre para el grupo');
        } else {
            groupSave = await ContainerGroup.addGroup(newGroup);
        }
        const list = await ContainerGroup.getGroups();
        res.status(201).json({Groups: list});
    } catch (error) {
        console.log('Error al crear el grupo indicado');
        res.status(500).json('Error al crear el grupo', error);
    }
};

const deleteGroup = async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            console.log('[ERROR]-> No se encontro el grupo indicado');
            return res.status(400).json('El id del grupo no existe o es incorrecto');
        }
        const groupDelete = await ContainerGroup.deleteGroup(id);
        if(!groupDelete){
            console.log('[ERROR]-> El grupo no existe o es incorrecto');
            return res.status(404).json('Hubo un error al eliminar el grupo indicado');
        }
        return res.status(200).json('Grupo eliminado correctamente');
    } catch (error) {
        console.log('[ERROR]-> No se pudo procesar el pedido', error);
        res.status(500).json({error: 'Error en el controlador'});
    };
};

const getGroupById = async (req, res) => {
    try {
        const id = req.params.id;
        if( !id ){
            console.log('No se selecciono el grupo');
            res.status(400).json('No se ingreso el grupo')
        }

        const group = await ContainerGroup.getGroupById(id);
        
        if(!group){
            res.status(404).json('No se encotro el grupo seleccionado')
        } else {
            res.status(200).json({ groupById: group });
        }


    } catch (error) {
        console.log('[ERROR]-> No se pudo procesar el pedido', error);
        res.status(404).json('Error al mostrar el grupo seleccionado')
    };
};

module.exports = {
    listGroup,
    addGroup,
    deleteGroup,
    getGroupById
}