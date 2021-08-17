const router = require('express').Router();

const { userController } = require('../../controllers');
const {
    isUserValid, authValid, fileMiddleware, todoMiddleware,
} = require('../../middlewares');

router.get('/', userController.getAllUsers);

router.post('/',
    fileMiddleware.checkFile,
    isUserValid.createMiddleware,
    userController.createUser);

router.get('/:userId',
    isUserValid.idMiddleware,
    userController.getUserById);

router.delete('/:userId',
     authValid.checkAccessToken,
    isUserValid.idMiddleware,
    userController.removeUserById);

router.patch('/:userId',
    authValid.checkAccessToken,
    isUserValid.idMiddleware,
    isUserValid.updateMiddleware,
    userController.updateUser);

router.post('/:userId/avatar',
    authValid.checkAccessToken,
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    isUserValid.idMiddleware,
    userController.changeAvatar);

router.post('/forgotPassword',
    isUserValid.forgotToken,
    userController.forgotPassword);

router.post('/changePassword',
    authValid.checkAccessToken,
    isUserValid.changePassword,
    userController.changePassword);

router.post('/:userId/addTodo', authValid.checkAccessToken, isUserValid.idMiddleware, todoMiddleware.createTodo, userController.addTodo);

router.post('/:userId/removeTodo', authValid.checkAccessToken,isUserValid.idMiddleware,todoMiddleware.addTodo, userController.removeTodoUser);

module.exports = router;
