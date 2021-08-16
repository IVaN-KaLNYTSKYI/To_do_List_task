const { ErrorHandler } = require('../../errors');
const { authValidator } = require('../../validators');
const { errorMess, codesEnum } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userService.getSingleUser({ email });

        const { error } = await authValidator.validate(req.body);

        if (error) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        if (!user) {
            throw new ErrorHandler(codesEnum.BAD_REQUEST,
                errorMess.WRONG_EMAIL_OF_PASSWORD.message,
                errorMess.WRONG_EMAIL_OF_PASSWORD.code);
        }

        if (user.activate_status === 'false') {
            throw new ErrorHandler(codesEnum.BAD_REQUEST,
                errorMess.ACTIVATE_STATUS_NO_VALID.message,
                errorMess.ACTIVATE_STATUS_NO_VALID.code);
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
