const { todoService } = require('../../services');
const { ErrorHandler } = require('../../errors');
const { errorMess, codesEnum } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { body: { todoId } } = req;

        const todo = await todoService.getSingleTodo({ _id: todoId });

        if (!todo) {
            throw new ErrorHandler(codesEnum.CONFLICT, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
