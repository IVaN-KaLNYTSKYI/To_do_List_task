const {errorMess, ErrorHandler, codesEnum} = require('../../errors');
const {todoService} = require('../../services');
const {validatorUser} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { todoId } = req.params;

        const {error} = await validatorUser.idValidator.validate(todoId);

        const todo = await todoService.getSingleTodo({_id: todoId});

        if (error) {
            throw new ErrorHandler(codesEnum.BAD_REQUEST, error.details[0].message, errorMess.NOT_VALID_ID.code);
        }

        if (!todo) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        req.todo = todo;

        next();
    } catch (e) {
        next(e);
    }
};
