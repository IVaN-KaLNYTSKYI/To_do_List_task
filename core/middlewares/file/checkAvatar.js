const { ErrorHandler, codesEnum } = require('../../errors');

module.exports = (req, res, next) => {
    try {
        if (req.photos.length > 1) {
            throw new ErrorHandler(codesEnum.BAD_REQUEST, 'Body not valid!', 4008);
        }

        [req.avatar] = req.photos;
        next();
    } catch (e) {
        next(e);
    }
};
