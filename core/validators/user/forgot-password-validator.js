const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.string()
    .regex(regexpEnum.PASSWORD_REGEXP)
    .trim()
    .required();
