const ContainerWish = require('../wishList/wishListService');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const addWish = async (req, res) => {
    try {
        const wishNew = req.body;
        if(!wishNew){
            res.status(404).json('No se registro el nuevo deseo')
        } else {
            const token = req.headers.authorization.split(' ')[1];
            // Decodificar el token para obtener el ID del usuario
            const decodedToken = jwt.verify(token, JWT_SECRET);
            const userId = decodedToken.id; 

            wishSave = await ContainerWish.addWish(wishNew, userId);
        }
        res.status(201).json({wishNew: wishSave});
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador de lista de deseo'});
        console.log('Error al crear el nuevo deseo');
    };
};

const wishList = async (req, res) => {
    try {
        const wishLists = await ContainerWish.getWishs();
        res.status(200).json({wishs: wishLists});
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('No se pueden mostrar las tareas');
    };
};

const updateWish = async (req, res) => {
    const id = req.params.id;
    const wishUpdate = req.body;

    try {
        const updatedWish = await ContainerWish.updateWish(id, wishUpdate);
        res.status(200).json({wishUpdate: updatedWish});
    } catch (error) {
        console.log('Error al editar el deseo', error);
        res.status(500).json({ error: 'Error al actualizar el deseo' });
    };
};

const deleteWish = async (req, res) => {
    const id = req.params.id;
    try {
        const wishDelete = await ContainerWish.deleteWish(id);
        res.status(200).json('Deseo eliminado correctamente')
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('[ERROR]-> Hubo un error, intente mas tarde', error)
    };
};

const getWishbyId = async (req, res) => {
    try {
        const id = req.params.id;
        const wishById = await ContainerWish.getwishById(id);
        
        if(!wishById){
            res.status(404).json('Error no se encontro el deseo que quieres buscar');
        } else {
            res.status(200).json({wishById: wishById});
        };
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('[ERROR]-> Error en el controlador al buscar tarea por ID', error);
            throw error;
    };
};

module.exports = {
    addWish,
    wishList,
    updateWish,
    deleteWish,
    getWishbyId
}