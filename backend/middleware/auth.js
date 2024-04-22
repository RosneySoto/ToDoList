require('dotenv').config();
const ContainerUser = require('../components/user/userService');
const {compare, encrypt} = require('./bcrypt');
const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;


const authenticate = async (req, res, next) => {
     try {
        const {email, password} = req.body
        const user = await ContainerUser.loginUser(email);
        if(!user) {
            console.log('El usuario no existe');
            return res.status(404).json({error: 'Usuario o contraseña incorrecta'});

        } else {

            const checkPass = await compare(password, user.password);

            if(checkPass){
                req.user = user;
                req.session.user = { id: user.id, email: user.email }
                // console.log(req.session.user);
                return next();
            } else {
               console.log('Error en el password');
               return res.status(404).json({error: 'Usuario o contraseña incorrecta'});
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
            const saveUser = await ContainerUser.addUser(newUser);
            req.user = saveUser;
            return next();
        };
    } catch (error) {
        console.log('[ERROR]-> Error en el middelware', error);
        res.status(500).send('Error en el servidor');
    }
};


const generateToken = async (req, res, next) => {
    const user = req.user;

    if (!user) {
        return res.status(401).send('No estas autorizado');
    };

    const payload = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        groupId: user.groupId 
    };

    const token = jwt.sign(payload, JWT_SECRET, {expiresIn: '24h'});
    res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 24 * 60 * 60 * 1000 });

    req.token = token;

    // console.log('....' + token); 

    next();
};


const verifyToken = async (req, res, next) => {

    // Extraer el token del encabezado Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    // console.log('[Token verificado] ' + token);

    if (!token) {
        return res.status(403).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, JWT_SECRET, (error, data) => {
        if (error) {
            return res.status(401).send({ message: 'No estás autorizado' });
        }
        // req.userId = data.email;
        req.user = data;
        next();
    });
};

const verifySession = async (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        // El usuario no está autenticado, redirigir o enviar un error 401
        res.status(401).send('Acceso no autorizado session');
    }
}


module.exports = {
    authenticate,
    register,
    verifyToken,
    generateToken,
    verifySession,
};