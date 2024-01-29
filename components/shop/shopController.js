const ContainerShopCar = require('../shop/shopService');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const listAllShop = async (req, res) => {
    try {
        const allShop = await ContainerShopCar.getAllShop();
        res.status(200).json({allShop: allShop});
        // res.render('index');
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador carrito'});
        console.log('No se pueden mostrar el carrito');
    };
};

const addToCar = async (req, res) => {
    try {
        const newAddToCar = req.body;

        if (!newAddToCar) {
            return res.status(404).json('Tiene que seleccionar un deseo para agregarlo al carrito');
        } else {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, JWT_SECRET);
            const userId = decodedToken.id;

            const carSave = await ContainerShopCar.addToCar(newAddToCar, userId);

            res.status(201).json({ data: carSave });
        }
    } catch (error) {
        console.log('Error al agregar deseo al carrito', error);
        res.status(500).json({ error: 'Error en el controlador' });
    }
};

const deleteWishCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const deseoId = req.body;
        
        if (!deseoId) {
            return res.status(404).json('Tiene que seleccionar el deseo a eliminar');
        } else {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, JWT_SECRET);
            const userId = decodedToken.id;
            
            const carSave = await ContainerShopCar.deleteWishCar(deseoId, carId, userId);

            res.status(200).json({ data: carSave });
        }
    } catch (error) {
        console.log('Error al eliminar el deseo del carrito', error);
        res.status(500).json({ error: 'Error en el controlador' });
    }
};

const deleteTask = async (req, res) => {
    const id = req.params.id;
    try {
        const shopDelete = await ContainerShopCar.deleteShopCar(id);
        res.status(200).json('Se elimino el carrito correctamente')
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('[ERROR]-> Hubo un error, intente mas tarde', error)
    };
};

module.exports = {
    listAllShop,
    addToCar,
    deleteWishCar,
    deleteTask
};