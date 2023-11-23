const express = require('express');
// const passport = require('../middleware/passport');
const { authenticate, register, verifyToken,generateToken } = require('../middleware/auth');
const router = express.Router();

const { listTask, addTask, updateTask, deleteTask, finishTask } = require('../components/task/tasksController');

const { listPriority, addPriority, getTaskByPriority } = require('../components/priority/priorityController');

const { addUser, getUsers, deleteUser, updateUser, getUserById, getTaskByUser, loginUser, logoutUser, getLoginUser } = require('../components/user/userController');


//RUTAS DEL COMPONENTE TASK
router.get('/', verifyToken, listTask);
router.post('/', addTask);
router.patch('/edit/:id', updateTask);
router.delete('/delete/:id', deleteTask);
router.put('/finish/:id', finishTask);

//RUTAS DEL COMPONENTE PRIORITY
router.get('/priority', listPriority);
router.get('/priority/:id', getTaskByPriority);
router.post('/addPriority', addPriority);

//RUTAS DEL COMPONENTE USER+
router.get('/login', getLoginUser);
router.post('/login', authenticate, generateToken, loginUser);
router.post('/user', register, addUser);
router.get('/user', verifyToken, getUsers);
router.get('/user/:id', getUserById);
router.get('/user/tasklist/:id', getTaskByUser);
router.delete('/user/:id', deleteUser);
router.put('/user/:id', updateUser);
router.get('/logout', logoutUser);

module.exports = router;