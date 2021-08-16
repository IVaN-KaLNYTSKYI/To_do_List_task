const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    name: Joi.string()
        .alphanum()
        .trim()
        .min(4)
        .max(30),
    age: Joi.number()
        .integer()
        .min(1)
        .max(110),
    email: Joi.string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    password: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .trim()
        .required(),
});
