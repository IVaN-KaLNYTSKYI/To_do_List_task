const { ErrorHandler } = require('../../errors');
const { errorMess, codesEnum } = require('../../errors');
const { userService } = require('../../services');
const { validatorUser } = require('../../validators');
const { passwordHasher } = require('../../helpers');

module.exports = async (req, res, next) => {
    try {
        const { oldPassword, email } = req.body;

        const { error } = await validatorUser.changePassword.validate(req.body);

        if (error) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, error.details[0].message, errorMess.USER_NOT_FOUND.code);
        }

        const user = await userService.getSingleUser({ email });

        if (!user) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        await passwordHasher.compare(oldPassword, user.password);

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
