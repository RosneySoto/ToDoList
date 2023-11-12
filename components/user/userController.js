const ContainerUser = require('./userService');
const userModel = require('../../model/userModel');
const {compare, encrypt} = require('../../middleware/bcrypt');
const {generarJwt, tokenValido, verificarJwt} = require('../../middleware/jwt')

const addUser = async (req, res) => {
    try {
        const { name, lastname, email, password, birthday } = req.body;

        if (!name || !lastname || !email || !password || !birthday) {
            console.log('[ERROR]-> Faltan datos del usuario');
            return res.status(404).send('Faltan datos del usuario');
        } else {
            const user = req.user;
            const token = generarJwt(user);
            res.status(201).send({token});
        };        
    } catch (error) {
        console.log('Error, no se puede crear el usuario', error);
        throw error;
    };
};

const loginUser = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password || email === "" || password === ""){
        res.status(404).send('Debe ingresar usuario y contraseña')
    } else {
        const user = req.user;
        const token = generarJwt(user);
        res.status(200).send({token});
    };
};

const getLoginUser = (req, res) => {
    res.send('Por favor inica Sesion');
};

const getUsers = async (req, res) => {
    try {
        const allUser = await ContainerUser.getUsers();
        res.status(200).send({users: allUser});
    } catch (error) {
        console.log('[ERROR]-> No se pudo procesar el pedido', error);
        res.status(400).send('Error al mostrar los usuarios')
    };
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        if(!id){
            console.log('[ERROR]-> El id del usuario no existe o es incorrecto');
            return res.status(400).send('El id del usuario no existe o es incorrecto');
        }
        const userDelete = await ContainerUser.deleteUser(id);
        if(!userDelete){
            console.log('[ERROR]-> El usuario no existe');
            return res.status(404).send('El usuario no existe');
        }
        return res.status(200).send('Usuario eliminado correctamente');
    } catch (error) {
        console.log('[ERROR]-> No se pudo procesar el pedido', error);
        return res.status(400).send('No se pudo procesar el pedido');
    };
};

const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        if(!id || id === 'user'){
            console.log('No se ingreso el id del usuario');
            return res.status(400).send('No se ingreso el id del usuario');
        }

        const userUpdate = await ContainerUser.updateUser(id, user);
        if(!userUpdate){
            console.log('El usuario no existe');
            return res.status(404).send('El usuario no existe');
        }
        return res.status(200).send({taskUpdate: userUpdate});
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
            res.status(400).send('No se ingreso el usuario')
        }
        const user = await ContainerUser.getUserById(id);
        res.status(200).send({userById: user});
    } catch (error) {
        console.log('[ERROR]-> No se pudo procesar el pedido', error);
        res.status(404).send('Error al mostrar el usuario')
    };
};

const getTaskByUser = async (req, res) => {
    const id = req.params.id;
    try {
        const taskByUserFind = await ContainerUser.getTaskByUser(id);
        res.status(200).send({allTaskByUser: taskByUserFind});
    } catch (error) {
        res.status(404).send('Error');
        console.log('Error al listar las tareas por ID de usuario', error);
    };
};

const logoutUser = async (req, res) => {
    req.session.destroy( (err) => {
        if(!err) res.send('Logout OK')
        else res.send({status: 'LOGOUT ERROR', body: err})
    });
};

module.exports = {
    addUser,
    getUsers,
    deleteUser,
    updateUser,
    getUserById,
    getTaskByUser,
    loginUser,
    logoutUser,
    getLoginUser
}