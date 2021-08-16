const { Schema, model } = require('mongoose');

const { dataBaseEnum } = require('../constants');

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model(dataBaseEnum.TODO, todoSchema);
