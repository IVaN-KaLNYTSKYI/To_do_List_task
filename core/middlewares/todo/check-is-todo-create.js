const {todoValidator} = require("../../validators");
const { ErrorHandler } = require('../../errors');
const { errorMess, codesEnum } = require('../../errors');

module.exports = async (req, res, next) => {
    try {
        const { error } = await todoValidator.createValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
