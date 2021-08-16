const { Todo } = require('../dataBase');

module.exports = {
    findTodo: () => Todo.find({}),

    getSingleTodo: (params) => Todo.findOne(params),

    createTodo: (objectUser) => Todo.create(objectUser),

    updateTodo: (userId, updateBody) => Todo.updateOne({ _id: userId }, updateBody),

    removeTodo: (id) => Todo.deleteOne({ _id: id }),
};
