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
    /* authValid.checkAccessToken, */
    isUserValid.idMiddleware,
    userController.removeUserById);

router.patch('/:userId',
    authValid.checkAccessToken,
    isUserValid.idMiddleware,
    isUserValid.updateMiddleware,
    userController.updateUser);

router.post('/:userId/avatar',
    /*authValid.checkAccessToken,*/
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    isUserValid.idMiddleware,
    userController.changeAvatar);

router.post('/:userId/addTodo',isUserValid.idMiddleware, userController.addTodo);

router.post('/:userId/removeTodo',isUserValid.idMiddleware, userController.removeTodoUser);

module.exports = router;
