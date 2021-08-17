const { todoService } = require('../../services');
const { ErrorHandler } = require('../../errors');
const { errorMess, codesEnum } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { body: { id } } = req;

        const todo = await todoService.getSingleTodo({ _id: id });

        if (!todo) {
            throw new ErrorHandler(codesEnum.CONFLICT, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
