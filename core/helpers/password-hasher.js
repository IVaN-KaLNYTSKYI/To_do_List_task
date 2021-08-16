const bcrypt = require('bcrypt');
const { ErrorHandler } = require('../errors');
const { errorMess } = require('../errors');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hashPassword) => {
        const isPassword = await bcrypt.compare(password, hashPassword);

        if (!isPassword) {
            throw new ErrorHandler(400, errorMess.WRONG_EMAIL_OF_PASSWORD.message, errorMess.WRONG_EMAIL_OF_PASSWORD.code);
        }
    }
};
