
const { todoService } = require('../services');

module.exports = {

    getAllTodo: async (req, res, next) => {
        try {
            const goods = await todoService.findTodo().lean();

            res.json(goods);
        } catch (e) {
            next(e);
        }
    },

    updateTodo: async (req, res, next) => {
        try {
            await todoService.updateTodo(req.params.todoId, {
                ...req.body
            });

            res.json('update');
        } catch (e) {
            next(e);
        }
    },

    getTodoId: async (req, res, next) => {
        try {
            const {todo} = req;

            res.json(todo);
        } catch (e) {
            next(e);
        }
    },

};
