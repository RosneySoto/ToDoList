const express = require('express');
const { authenticate, register, verifyToken,generateToken, verifySession } = require('../middleware/auth');
const router = express.Router();

//Importaciones Modulo Task
const { listTask, addTask, updateTask, deleteTask, finishTask, openTask, getTaskbyId } = require('../components/task/tasksController');

//Importaciones Modulo Prioriry
const { listPriority, addPriority, getTaskByPriority } = require('../components/priority/priorityController');

//Importaciones Modulo User
const { addUser, getUsers, deleteUser, updateUser, getUserById, loginUser, logoutUser, getLoginUser, updatePass, getTaskByUserId } = require('../components/user/userController');

const { addWish, deleteWish, updateWish, wishList, getWishbyId } = require('../components/wishList/wishListController');

//Importaciones Modulo ShopCar
const { listAllShop, addToCar, deleteWishCar, processAndPuchaseCar } = require('../components/shop/shopController');

//RUTAS DEL COMPONENTE TASK
// router.get('/task', listTask);
router.get('/task', verifyToken, listTask);
router.get('/task/:id', verifySession, verifyToken, getTaskbyId);
router.post('/task', verifyToken, addTask);
router.patch('/edit/:id', verifySession, verifyToken, updateTask);
router.delete('/delete/:id', verifySession, verifyToken, deleteTask);
router.put('/finish/:id', verifySession, verifyToken, finishTask);
router.put('/openTask/:id', verifySession, verifyToken, openTask);

//RUTAS DEL COMPONENTE PRIORITY
router.get('/priority', verifyToken, listPriority);
// router.get('/priority', listPriority);
router.get('/priority/:id', verifySession, verifyToken, getTaskByPriority);
router.post('/addPriority', verifySession, verifyToken, addPriority);

//RUTAS DEL COMPONENTE USER+
router.get('/login', getLoginUser);
router.post('/login', authenticate, generateToken, loginUser);
router.post('/user', register, addUser);
router.get('/user', getUsers);
// router.get('/user', verifySession, verifyToken, getUsers);
router.get('/user/:id', verifySession, verifyToken, getUserById);
router.get('/user/tasklist/:id', verifySession, verifyToken, getTaskByUserId);
router.delete('/user/:id', verifySession, verifyToken, deleteUser);
router.put('/user/:id', verifySession, verifyToken, updateUser);
router.get('/logout', verifySession, verifyToken, logoutUser);
router.put('/pass', updatePass);

//RUTAS DEL COMPONENTE WISH-LIST
router.get('/wish', verifySession, verifyToken, wishList);
router.get('/wish/:id', verifySession, verifyToken, getWishbyId);
router.post('/wish', verifyToken, verifySession, addWish);
router.patch('/wishEdit/:id', verifySession, verifyToken, updateWish);
router.delete('/wishDelete/:id', verifySession, verifyToken, deleteWish);

router.get('/shopCar', verifySession, verifyToken, listAllShop)
router.post('/add-shopCar', verifySession, verifyToken, addToCar)
router.delete('/delete-wish/:id', verifySession, verifyToken, deleteWishCar)
router.patch('/buyCar/:id', verifySession, verifyToken, processAndPuchaseCar)

module.exports = router;