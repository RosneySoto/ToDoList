const ContainerGroup = require('./groupService');
const groupModel = require('../../model/groupModel');
const userModel = require ('../../model/userModel');

const listGroup = async (req, res) => {
    try {
        const grups = await ContainerGroup.getGroups();
        res.status(200).json({Grups: grups});
    } catch (error) {
        console.log('No se pueden mostrar los grupos');
    };
};

const addGroup = async (req, res) => {
    const userId = req.cookies.userId || req.body.userId || req.query.userId;
    console.log('nuevo id ' + userId);
    const {nameGroup}  = req.body;

    if (!userId || !nameGroup   ) {
        return res.status(400).json({ error: 'El userId y el campo nameGroup son requeridos y deben ser válidos.' });
    }

    try {
        const newGroup = new groupModel({ nameGroup });
        await newGroup.save();

        const userUpdate = await userModel.findByIdAndUpdate(userId, {
            groupId: newGroup._id // Asociar el ID del nuevo grupo creado
        }, {
            new: true
        });

        res.status(201).json({ message: 'Grupo creado correctamente', user: userUpdate });

    } catch (error) {
        console.error('Error al crear el grupo:', error);
        res.status(500).json({ error: 'Hubo un problema al crear el grupo' });
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

const getViewGroup = (req, res) => {
    res.status(404).json('Por favor indica el nbombre del grupo');
};

const inviteUser = async (req, res) => {
    try {
        const {email} = req.body
        if(!email){
            console.log('Debe ingresar un mail')
            res.status(400).json('Debe ingresar un mail')
        }
        const data = await ContainerGroup.inviteUser(email);
        res.status(200).json({message: 'mail enviado correctamente', data})
    } catch (error) {
        console.log('[ERROR]-> No se pudo enviar el mail', error);
        res.status(404).json('Error al enviar el link de registro')
    }
}

module.exports = {
    listGroup,
    addGroup,
    deleteGroup,
    getGroupById,
    getViewGroup,
    inviteUser  
}