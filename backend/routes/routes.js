const express = require('express');
const { authenticate, register, verifyToken,generateToken } = require('../middleware/auth');
const router = express.Router();

//Importaciones Modulo Task
const { listTask, addTask, updateTask, deleteTask, finishTask, openTask, getTaskbyId } = require('../components/task/tasksController');

//Importaciones Modulo Prioriry
const { listPriority, addPriority, getTaskByPriority } = require('../components/priority/priorityController');

//Importaciones Modulo User
const { addUser, getUsers, deleteUser, updateUser, getUserById, loginUser, logoutUser, getLoginUser, updatePass, getTaskByUserId } = require('../components/user/userController');

const { addWish, deleteWish, updateWish, wishList, getWishbyId } = require('../components/wishList/wishListController');

//Importaciones Modulo ShopCar
const { listAllShop, addToCar, deleteWishCar, processAndPuchaseCar, deleteCart } = require('../components/shop/shopController');

//RUTAS DEL COMPONENTE TASK
router.get('/task', verifyToken, listTask);
router.get('/task/:id', verifyToken, getTaskbyId);
router.post('/task', verifyToken, addTask);
router.patch('/task/edit/:id', verifyToken, updateTask);
router.delete('/task/delete/:id', verifyToken, deleteTask);
router.put('/task/finish/:id', verifyToken, finishTask);
router.put('/task/openTask/:id', verifyToken, openTask);

//RUTAS DEL COMPONENTE PRIORITY
router.get('/priority', verifyToken, listPriority);
router.get('/priority/:id', verifyToken, getTaskByPriority);
router.post('/addPriority', verifyToken, addPriority);

//RUTAS DEL COMPONENTE USER+
router.get('/login', getLoginUser);
router.post('/login', authenticate, generateToken, loginUser);
router.post('/user/register', register, addUser);
router.get('/user', getUsers);
router.get('/user/:id', verifyToken, getUserById);
router.get('/user/tasklist/:id', verifyToken, getTaskByUserId);
router.delete('/user/:id', verifyToken, deleteUser);
router.put('/user/:id', verifyToken, updateUser);
router.post('/logout', verifyToken, logoutUser);
router.put('/pass', updatePass);

//RUTAS DEL COMPONENTE WISH-LIST
router.get('/wish', verifyToken, wishList);
router.get('/wish/:id', verifyToken, getWishbyId);
router.post('/wish', verifyToken, addWish);
router.patch('/wishEdit/:id', verifyToken, updateWish);
router.delete('/wishDelete/:id', verifyToken, deleteWish);

router.get('/shopCar', verifyToken, listAllShop)
router.post('/add-shopCar', verifyToken, addToCar)
router.delete('/delete-wish/:id', verifyToken, deleteWishCar)
router.delete('/deleteCart/:id', verifyToken, deleteCart);
router.patch('/buyCart/:id', verifyToken, processAndPuchaseCar)

module.exports = router;