const { User } = require('../dataBase');

module.exports = {
    findUser: async () => {
        const user = await User.find({}).select('-password');

        return{ data:user }
    },

    getSingleUser: (params) => User.findOne(params).select('-password'),

    createUser: (objectUser) => User.create(objectUser),

    updateUser: (userId, updateBody) => User.updateOne({ _id: userId }, updateBody),

    removeUser: (id) => User.deleteOne({ _id: id }),
};
