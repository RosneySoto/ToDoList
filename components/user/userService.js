const userModel = require('../../model/userModel');
const taskModel = require('../../model/taskDB');

class ContainerUser {

    static async addUser(user) {
        try {
            const newUser = await userModel({
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                birthday: user.birthday
            });
            return newUser.save();
        } catch (error) {
            console.log('[ERROR]-> Error al crear el registro');
            throw error;
        };
    };

    static async loginUser(email){
        try {
            console.log(email);
            const user = await userModel.findOne({email: email});
            if(!user){
                console.log('El usuario no existe');
                return null;
            } else {
                return user;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al loguear el usuario');
            throw error;
        };
    };

    static getUsers() {
        try {
            const allUser = userModel.find();
            return allUser;
        } catch (error) {
            console.log('[ERROR]-> Error al listar los usuarios', error);
            throw error;
        }
    };

    static async deleteUser (idUser){
        try {
            const user = userModel.findByIdAndDelete({_id: idUser});
            return user;
        } catch (error) {
            console.log('[ERROR]-> Error al eliminar los usuarios', error);
            throw error;
        };
    };

    static async updateUser (id, user){
        try {
            const { name, lastname, email, password, birthday } = user
            if(!name || !lastname || !email || !password || !birthday){
                console.log('[ERROR]-> Faltan datos del usuario');
                return null;
            }
            const userUpdate = await userModel.findByIdAndUpdate(id, {
                $set: user
            },{
                new: true
            });
            return userUpdate;
        } catch (error) {
            console.log('[ERROR]-> Error al editar el usuario', error);
            throw error;
        };
    };

    static async getUserById (id){
        try {
            const user = userModel.findById(id);
            if(!id){
                console.log('El usuario no existe')
            } else {
                return user;
            };
        } catch (error) {
            console.log('[ERROR]-> Error al buscar usuario por ID', error);
            throw error;
        }
    };

    static async getTaskByUser (id){
        try {
            const allTaskList = taskModel.find({ userId: id }).populate('userId');
            return allTaskList;
        } catch (error) {
            console.log('[ERROR]-> Error al buscar las tareas por usuario');
            throw error;
        };
    };


};

module.exports = ContainerUser;