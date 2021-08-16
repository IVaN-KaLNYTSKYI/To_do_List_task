const Joi = require('joi');

const { regexpEnum } = require('../../constants');

module.exports = Joi.object({
    title: Joi.string()
        .alphanum()
        .trim()
        .min(4)
        .max(30),

    description: Joi.string()
        .alphanum()
        .trim()
        .min(4)
        .max(10000),
});
