const ContainerUser = require('./userService');
const userModel = require('../../model/userModel');
const {compare, encrypt} = require('../../middleware/bcrypt');
const {generarJwt, tokenValido, verificarJwt} = require('../../middleware/auth');

const addUser = async (req, res) => {
    try {
        const { name, lastname, email, password, birthday } = req.body;

        if (!name || !lastname || !email || !password || !birthday) {
            console.log('[ERROR]-> Faltan datos del usuario');
            return res.status(404).json('Faltan datos del usuario');
        } else {
            const user = req.user;
            res.status(201).json('Logeado correctamente');
        };        
    } catch (error) {
        res.status(500).json({error: 'Error en el controlador'});
        console.log('Error, no se puede crear el usuario', error);
        throw error;
    };
};

const loginUser = async (req, res) => {

    const {email, password} = req.body

    if(!email || !password || email === "" || password === ""){
        res.status(404).json('Debe ingresar usuario y contraseña');

    } else {
        res.status(200).json({ message: 'Usuario logueado exitosamente', token: req.token });
    };
};

const getLoginUser = (req, res) => {
    res.status(404).json('Por favor inica Sesion');
};

const getUsers = async (req, res) => {
    try {
        const allUser = await ContainerUser.getUsers();
        res.status(200).json({users: allUser});
    } catch (error) {
        console.log('[ERROR]-> No se pudo procesar el pedido', error);
        res.status(500).json({error: 'Error en el controlador'});
    };
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            console.log('[ERROR]-> El id del usuario no existe o es incorrecto');
            return res.status(400).json('El id del usuario no existe o es incorrecto');
        }
        const userDelete = await ContainerUser.deleteUser(id);
        if(!userDelete){
            console.log('[ERROR]-> El usuario no existe');
            return res.status(404).json('El usuario no existe');
        }
        return res.status(200).json('Usuario eliminado correctamente');
    } catch (error) {
        console.log('[ERROR]-> No se pudo procesar el pedido', error);
        res.status(500).json({error: 'Error en el controlador'});
    };
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        if(!id || id === 'user'){
            console.log('No se ingreso el id del usuario');
            return res.status(400).json('No se ingreso el id del usuario');
        }

        const userUpdate = await ContainerUser.updateUser(id, user);
        if(!userUpdate){
            console.log('El usuario no existe');
            return res.status(404).json('El usuario no existe');
        }
        return res.status(200).json({taskUpdate: userUpdate});
    } catch (error) {
        console.log('Error al editar la tarea', error);
        return res.status(500).json({ error: 'Error al actualizar la tarea' });
    };
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id || id === 'user'){
            console.log('No se ingreso el usuario');
            res.status(400).json('No se ingreso el usuario')
        }
        const user = await ContainerUser.getUserById(id);
        res.status(200).json({userById: user});
    } catch (error) {
        console.log('[ERROR]-> No se pudo procesar el pedido', error);
        res.status(404).json('Error al mostrar el usuario')
    };
};

const getTaskByUserId = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id) {
            res.status(404).json('Error, usuario no encontrado');    
        };

        const taskOfUser = await ContainerUser.getTaskByUserId(id);
        res.status(200).json({Task_Of_User: taskOfUser});
    } catch (error) {
        res.status(404).json('Error');
        console.log('Error al listar las tareas por ID de usuario', error);
    };
};

const logoutUser = async (req, res) => {
    req.session.destroy( (err) => {
        if(!err) res.status(200).json('Logout OK')
        else res.status().json({status: 'LOGOUT ERROR', body: err})
    });
};

const updatePass = async (req, res) => {
    const { email, pass1, pass2 } = req.body;
    
    try {
        const passUpdate = await ContainerUser.changePassword(email, pass1);

        if (!passUpdate) {
            return res.status(401).json({ error: 'El usuario no existe' });
        }

        if (pass1 === pass2) {
            res.json({ passUpdate: 'Se modificó correctamente la contraseña' });
        } else {
            res.json({ error: 'La contraseña no coincide' });
        }

    } catch (error) {
        console.log('error al editar el password', error);
        res.status(500).json({ error: 'Error al editar el password' });
    };
};

module.exports = {
    addUser,
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
    getTaskByUserId,
    loginUser,
    logoutUser,
    getLoginUser,
    updatePass,
}