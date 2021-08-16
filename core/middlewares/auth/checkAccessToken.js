const { authHelper } = require('../../helpers');
const { OAuth } = require('../../dataBase');
const { ErrorHandler } = require('../../errors');
const { errorMess, codesEnum } = require('../../errors');
const { constants } = require('../../constants');
const { userService } = require('../../services');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(codesEnum.BAD_REQUEST, errorMess.NOT_TOKEN.message, errorMess.NOT_TOKEN.code);
        }

        await authHelper.verifyToken(token);

        const tokenObject = await OAuth.findOne({ accessToken: token });

        const user = await userService.getSingleUser({ _id: tokenObject.user });

        if (!user) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        if (!tokenObject) {
            throw new ErrorHandler(codesEnum.UNAUTHORIZED, errorMess.WRONG_TOKEN.message, errorMess.WRONG_TOKEN.code);
        }

        next();
    } catch (e) {
        next(e);
    }
};
