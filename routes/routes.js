const express = require('express');
const { authenticate, register, verifyToken,generateToken, verifySession } = require('../middleware/auth');
const router = express.Router();

//Importaciones Modulo Task
const { listTask, addTask, updateTask, deleteTask, finishTask, openTask } = require('../components/task/tasksController');

//Importaciones Modulo Prioriry
const { listPriority, addPriority, getTaskByPriority } = require('../components/priority/priorityController');

//Importaciones Modulo User
const { addUser, getUsers, deleteUser, updateUser, getUserById, loginUser, logoutUser, getLoginUser, updatePass, getTaskByUserId } = require('../components/user/userController');


//RUTAS DEL COMPONENTE TASK
router.get('/', verifySession, verifyToken, listTask);
router.post('/', verifySession, verifyToken, addTask);
router.patch('/edit/:id', verifySession, verifyToken, updateTask);
router.delete('/delete/:id', verifySession, verifyToken, deleteTask);
router.put('/finish/:id', verifySession, verifyToken, finishTask);
router.put('/openTask/:id', verifySession, verifyToken, openTask);

//RUTAS DEL COMPONENTE PRIORITY
router.get('/priority', verifySession, verifyToken, listPriority);
router.get('/priority/:id', verifySession, verifyToken, getTaskByPriority);
router.post('/addPriority', verifySession, verifyToken, addPriority);

//RUTAS DEL COMPONENTE USER+
router.get('/login', getLoginUser);
router.post('/login', authenticate, generateToken, loginUser);
router.post('/user', register, addUser);
router.get('/user', verifySession, verifyToken, getUsers);
router.get('/user/:id', verifySession, verifyToken, getUserById);
router.get('/user/tasklist/:id', verifySession, verifyToken, getTaskByUserId);
router.delete('/user/:id', verifySession, verifyToken, deleteUser);
router.put('/user/:id', verifySession, verifyToken, updateUser);
router.get('/logout', verifySession, verifyToken, logoutUser);
router.put('/pass', updatePass);

module.exports = router;