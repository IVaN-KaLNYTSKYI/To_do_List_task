const { ErrorHandler } = require('../../errors');
const { validatorUser } = require('../../validators');
const { userService } = require('../../services');
const { errorMess, codesEnum } = require('../../errors');
const { activateToken } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { email } = req.body;

        const tokenActivate = activateToken();

        const userObject = { ...req.body, activate_token: tokenActivate, activate_status: false };

        const { error } = await validatorUser.createValidator.validate(req.body);

        const user = await userService.getSingleUser({ email });

        if (error) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        if (user) {
            throw new ErrorHandler(codesEnum.CONFLICT, errorMess.NOT_EXISTS.message, errorMess.NOT_EXISTS.code);
        }

        req.user = userObject;

        next();
    } catch (e) {
        next(e);
    }
};
