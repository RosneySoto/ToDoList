const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../model/userModel');
const ContainerUser = require('../components/user/userService');
const {compare, encrypt} = require('../middleware/bcrypt');

passport.use('autenticacion', new LocalStrategy( async (email, password, callback) =>{

    const userAll = await ContainerUser.getUsers();
    const user = await userAll.findOne({ email: email });

    if(!user) return callback(new Error('USUARIO NO REGISTRADO'), null);

    const checkPass = await compare(password, user.password);
    if(checkPass){
        return callback(null, user);
    }else{
        return callback(new Error('ERROR EN LA CONTRASEÑA'), null)
    };
}));

passport.serializeUser((user,callback) => {
    callback(null, user.id);
})

passport.deserializeUser(async (id, callback) => {
    const user = await userModel.findById(id);
    callback(null, user);
});

module.exports = passport;