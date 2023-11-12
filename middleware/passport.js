// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const userModel = require('../model/userModel');
// const ContainerUser = require('../components/user/userService');
// const {compare, encrypt} = require('../middleware/bcrypt');

// passport.use('autenticacion', new LocalStrategy( async (email, password, callback) =>{

//     console.log(`Intentando autenticar al usuario: ${email}`);

//     try {
//         const user = await ContainerUser.loginUser(email);

//         if (!user) {
//             console.log('Usuario no registrado');
//             return callback(null, false, { message: 'USUARIO NO REGISTRADO' });
//         }

//         const checkPass = await compare(password, user.password);
//         if (checkPass) {
//             console.log('Contraseña correcta');
//             return callback(null, user);
//         } else {
//             console.log('Error en la contraseña');
//             return callback(null, false, { message: 'ERROR EN LA CONTRASEÑA' });
//         }
//     } catch (error) {
//         console.log('Error durante la autenticación', error);
//         return callback(error, null);
//     }
// }));

// passport.serializeUser((user,callback) => {
//     callback(null, user.id);
// })

// passport.deserializeUser(async (id, callback) => {
//     try {
//         const user = await userModel.findById(id);
//         callback(null, user);
//     } catch (error) {
//         callback(error, null);
//     }
// });

// module.exports = passport;