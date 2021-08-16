const Joi = require('joi');

module.exports = Joi.string()
    .alphanum()
    .trim()
    .min(24)
    .max(24)
    .id();
