const jwt = require('jsonwebtoken');

const { constants } = require('../constants');

module.exports = () => jwt.sign({}, constants.FORGOT_TOKEN, { expiresIn: '5m' });
