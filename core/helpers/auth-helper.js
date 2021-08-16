const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const { constants } = require('../constants');

const verifyPromise = promisify(jwt.verify);

module.exports = {
    generateToken: () => {
        const accessToken = jwt.sign({}, constants.ACCESS_TOKEN_SECRET, { expiresIn: constants.TIME_ACCESS_TOKEN });
        const refreshToken = jwt.sign({}, constants.REFRESH_TOKEN_SECRET, { expiresIn: constants.TIME_REFRESH_TOKEN });

        return {
            accessToken,
            refreshToken
        };
    },

    verifyToken: async (token, tokenType = constants.ACCESS) => {
        const secretWord = tokenType === constants.ACCESS ? constants.ACCESS_TOKEN_SECRET : constants.REFRESH_TOKEN_SECRET;

        await verifyPromise(token, secretWord);
    },

    verifyTokenActivate: async (token) => {
        const secretWord = constants.ACTIVATE_TOKEN_SECRET;

        await verifyPromise(token, secretWord);
    }
};
