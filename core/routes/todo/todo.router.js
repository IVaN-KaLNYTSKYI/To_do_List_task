const {authValid} = require("../../middlewares");
const {todoMiddleware} = require("../../middlewares");
const router = require('express').Router();

const {todoController} = require('../../controllers');

router.get('/', todoController.getAllTodo);

router.get('/:todoId',
    authValid.checkAccessToken,
    todoMiddleware.idTodo,
    todoController.getTodoId);

router.patch('/:todoId',
    authValid.checkAccessToken,
    todoMiddleware.idTodo,
    todoMiddleware.updateTodo,
    todoController.updateTodo);


module.exports = router;
