const { authHelper } = require('../../helpers');
const { ErrorHandler } = require('../../errors');
const { errorMess, codesEnum } = require('../../errors');
const { userService } = require('../../services');
const { validatorUser } = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const { token, password } = req.headers;

        const { error } = await validatorUser.forgotPasswordValidator.validate(password);

        if (error) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        if (!token) {
            throw new ErrorHandler(codesEnum.BAD_REQUEST, errorMess.NOT_TOKEN.message, errorMess.NOT_TOKEN.code);
        }

        await authHelper.verifyTokenForgot(token);

        const user = await userService.getSingleUser({ forgot_token: token });

        if (!user) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
