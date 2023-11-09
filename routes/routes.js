const express = require('express');
const router = express.Router();
const { listTask, addTask, updateTask, deleteTask, finishTask } = require('../components/task/tasksController');
const { listPriority, addPriority, getTaskByPriority } = require('../components/priority/priorityController');
const { addUser, getUsers, deleteUser, updateUser, getUserById, getTaskByUser, loginUser, logoutUser } = require('../components/user/userController');
const passport = require('../middleware/passport');

//RUTAS DEL COMPONENTE TASK
router.get('/', listTask);
router.post('/', addTask);
router.patch('/edit/:id', updateTask);
router.delete('/delete/:id', deleteTask);
router.put('/finish/:id', finishTask);

//RUTAS DEL COMPONENTE PRIORITY
router.get('/priority', listPriority);
router.get('/priority/:id', getTaskByPriority);
router.post('/addPriority', addPriority);

//RUTAS DEL COMPONENTE USER+
router.post('/user', addUser);
router.post('/login/user', passport.authenticate('autenticacion', {
    // successRedirect: '/',
    // failureRedirect: '/task/login/user',
    passReqToCallback: true
}), loginUser);
router.get('/user', getUsers);
router.get('/user/:id', getUserById);
router.get('/user/tasklist/:id', getTaskByUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);
router.get('/logout', logoutUser);

module.exports = router;