const { errorMess, ErrorHandler, codesEnum } = require('../../errors');
const { todoValidator } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { error } = await todoValidator.updateValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
