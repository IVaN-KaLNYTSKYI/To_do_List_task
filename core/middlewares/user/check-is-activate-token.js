const { authHelper } = require('../../helpers');
const { ErrorHandler } = require('../../errors');
const { errorMess, codesEnum } = require('../../errors');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const { token } = req.query;

        if (!token) {
            throw new ErrorHandler(codesEnum.BAD_REQUEST, errorMess.NOT_TOKEN.message, errorMess.NOT_TOKEN.code);
        }

        await authHelper.verifyTokenActivate(token);

        const user = await userService.getSingleUser({ activate_token: token });

        if (!user) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
