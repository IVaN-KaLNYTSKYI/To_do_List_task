const { Schema, model } = require('mongoose');

const { dataBaseEnum } = require('../constants');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    avatar: {
        type: String,
    },

    email: {
        type: String,
        unique: false,
        required: true
    },

    todo: [{ type: Schema.Types.Mixed }],

    age: {
        type: Number,
        default: 15
    },

    password: {
        type: String,
        required: true
    },

    activate_token: {
        type: String
    },

    activate_status: {
        type: String,
        required: true
    },

    forgot_token: {
        type: String
    },

    cloudinary_id: {
        type: String,
    }

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('userTodo', {
    ref: dataBaseEnum.TODO,
    localField: 'todo',
    foreignField: '_id',
});

userSchema
    .pre('find', function() {
        console.log('ok1');
        this.populate('userTodo');
    })
    .pre('findOne', function() {
        console.log('ok2');

        this.populate('userTodo');
    });

module.exports = model(dataBaseEnum.USER, userSchema);
