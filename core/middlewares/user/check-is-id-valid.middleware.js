const {errorMess, ErrorHandler, codesEnum} = require('../../errors');
const {userService} = require('../../services');
const {validatorUser} = require('../../validators');

module.exports = async (req, res, next) => {
    try {
        const {userId} = req.params;

        const {error} = await validatorUser.idValidator.validate(userId);

        const user = await userService.getSingleUser({_id: userId});

        if (error) {
            throw new ErrorHandler(codesEnum.BAD_REQUEST, error.details[0].message, errorMess.NOT_VALID_ID.code);
        }

        if (!user) {
            throw new ErrorHandler(codesEnum.NOT_FOUND, errorMess.USER_NOT_FOUND.message, errorMess.USER_NOT_FOUND.code);
        }

        req.user = user;

        next();
    } catch (e) {
        next(e);
    }
};
