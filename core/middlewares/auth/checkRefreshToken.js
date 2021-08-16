const { authHelper } = require('../../helpers');
const { OAuth } = require('../../dataBase');
const { ErrorHandler } = require('../../errors');
const { errorMess, codesEnum } = require('../../errors');
const { constants } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const token = req.get(constants.AUTHORIZATION);

        if (!token) {
            throw new ErrorHandler(codesEnum.BAD_REQUEST, errorMess.NOT_TOKEN.message, errorMess.NOT_TOKEN.code);
        }

        await authHelper.verifyToken(token, constants.REFRESH);

        const tokenObject = await OAuth.findOne({ refreshToken: token });

        if (!tokenObject) {
            throw new ErrorHandler(codesEnum.UNAUTHORIZED, errorMess.WRONG_TOKEN.message, errorMess.WRONG_TOKEN.code);
        }

        req.user = tokenObject.user;
        next();
    } catch (e) {
        next(e);
    }
};
