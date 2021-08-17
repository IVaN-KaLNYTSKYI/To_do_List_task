const { forgotToken } = require('../../helpers');
const { ErrorHandler } = require('../../errors');
const { validatorUser } = require('../../validators');
const { errorMess, codesEnum } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const { error } = await validatorUser.emailValidator.validate(email);

        if (error) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        const user = await userService.getSingleUser({ email });

        if (!user) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        const tokenForgot = forgotToken();

        const userObject = { user, forgot_token: tokenForgot };

        console.log(userObject);

        req.obj = userObject;

        next();
    } catch (e) {
        next(e);
    }
};
