const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string()
        .alphanum()
        .trim()
        .min(4)
        .max(30)
        .required(),
    description: Joi.string()
        .alphanum()
        .trim()
        .min(4)
        .max(10000)
        .required(),
});