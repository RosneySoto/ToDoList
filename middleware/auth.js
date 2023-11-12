const ContainerUser = require('../components/user/userService');
const {compare, encrypt} = require('./bcrypt');
const userModel = require('../model/userModel');


const authenticate = async (req, res, next) => {
     try {
        const {email, password} = req.body
        const findUser = await ContainerUser.loginUser(email);
        if(!findUser) {
            console.log('El usuario no existe');
            return res.status(404).send('El usuario no existe');

        } else {

            const checkPass = await compare(password, findUser.password);

            if(checkPass){
                req.user = findUser;
                return next();
            } else {
               console.log('Error en el password');
               return res.status(401).send('Contraseña incorrecta');
            }
        }
     } catch (error) {
        console.log('[ERROR]-> Error en el middelware', error);
        res.status(500).send('Error en el servidor');
     };
};

const register = async (req, res, next) => {
    try {
        const { name, lastname, email, password, birthday } = req.body;
        const userFind = await userModel.findOne({ email: email });

        if (userFind) {
            console.log('[ERROR]-> El usuario ya existe');
            return res.status(400).send('El usuario ya está registrado');
        } else {
            const passwordHash = await encrypt(password);

            const newUser = {
                name: name,
                lastname: lastname,
                email: email,
                password: passwordHash,
                birthday: birthday,
            };
            console.log(newUser);
            const saveUser = await ContainerUser.addUser(newUser);
            req.user = saveUser;
            return next();
        };
    } catch (error) {
        console.log('[ERROR]-> Error en el middelware', error);
        res.status(500).send('Error en el servidor');
    }
};



module.exports = {
    authenticate,
    register
};