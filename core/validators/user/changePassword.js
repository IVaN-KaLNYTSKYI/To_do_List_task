const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    email: Joi.string()
        .regex(regexpEnum.EMAIL_REGEXP)
        .required(),
    oldPassword: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .trim()
        .required(),
    newPassword: Joi.string()
        .regex(regexpEnum.PASSWORD_REGEXP)
        .trim()
        .required(),
});
