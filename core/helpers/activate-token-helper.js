const jwt = require('jsonwebtoken');

const { constants } = require('../constants');

module.exports = () => jwt.sign({}, constants.ACTIVATE_TOKEN_SECRET, { expiresIn: '15m' });
