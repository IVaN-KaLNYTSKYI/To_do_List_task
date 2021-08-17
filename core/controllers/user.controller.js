const path = require('path');
const {todoService} = require("../services");
const {userService} = require('../services');
const {codesEnum} = require('../errors');
const {passwordHasher, fileHelpers, userHelper} = require('../helpers');
const {mailService} = require('../services');
const {emailActionEnum} = require('../constants');

module.exports = {

    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findUser();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            [req.avatar] = req.photos;

            const {user: {password, email, name}, avatar} = req;

            const result = await fileHelpers.fileCloud(avatar.name, avatar.data,"avatars");

            const hashedPassword = await passwordHasher.hash(password);

            const createdUser = await userService.createUser({
                ...req.user,
                password: hashedPassword,
                avatar: result.secure_url,
                cloudinary_id: result.public_id,
            });

            await mailService.sendMail(email, emailActionEnum.WELCOME, {
                userName: name,
                token: createdUser.activate_token
            });

            res.status(codesEnum.CREATE).send(createdUser);
        } catch (e) {
            next(e);
        }
    },

    getUserById: async (req, res, next) => {
        try {
            const {user} = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    removeUserById: async (req, res, next) => {
        try {
            const {user} = req;

            for (let value of user.todo){
                await todoService.removeTodo(value);
            }

            await fileHelpers.removeFileCloud(user.cloudinary_id);

            await userService.removeUser(req.params.userId);

            await mailService.sendMail(user.email, emailActionEnum.REMOVE, {userName: user.name});

            res.json('user remove');
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const {
                password, name, email
            } = req.body;

            const hashedPassword = await passwordHasher.hash(password);

            await userService.updateUser(req.params.userId, {
                ...req.body, password: hashedPassword
            });

            await mailService.sendMail(email, emailActionEnum.UPDATE, {userName: name});

            res.json('update');
        } catch (e) {
            next(e);
        }
    },

    changeAvatar: async (req, res, next) => {
        try {
            const {avatar, user} = req;

            const {_id} = user;

            if (avatar) {
                await fileHelpers.removeFileCloud(user.cloudinary_id);

                const result = await fileHelpers.fileCloud(avatar.name, avatar.data);

                await userService.updateUser({_id},
                    {
                        avatar: result.secure_url,
                        cloudinary_id: result.public_id,
                    });
            }

            const userChange = await userService.getSingleUser({_id});

            res.json({
                user,
                userChange
            });
        } catch (e) {
            next(e);
        }
    },

    addTodo: async (req, res, next) => {
        try {
            const todo = await todoService.createTodo({ ...req.body});

            console.log(todo)

            const user = await userService.updateUser(req.params.userId, {$push: {todo:todo._id }});

            res.json(user);
        } catch (e) {
            next(e);
        }
    },


    removeTodoUser: async (req, res, next) => {
        try {
            const {body: {id}, params: {userId}, user} = req;

            const userIndex = user.todo.indexOf(id);

            const userFilter = user.todo.filter(((value, index) => {
                if(index!==userIndex){
                    return value
                }
            }))

            await todoService.removeTodo(id);

            await userService.updateUser(userId, {$set: {todo: userFilter}});

            res.json({
                text:'Видалено 1 todo'
            });
        } catch (e) {
            next(e);
        }
    },

    forgotPassword: async (req, res, next) => {
        try {
            const { user: { _id }, headers: { password } } = req;

            const hashedPassword = await passwordHasher.hash(password);

            await userService.updateUser({ _id }, { password: hashedPassword });

            res.json({
                text:"password update"
            });
        } catch (e) {
            next(e);
        }
    },

    changePassword: async (req, res, next) => {
        try {
            const { user: { _id }, body: { newPassword } } = req;

            const hashedPassword = await passwordHasher.hash(newPassword);

            await userService.updateUser({ _id }, { password: hashedPassword });

            res.json({
                text:"change password"
            });
        } catch (e) {
            next(e);
        }
    },

};
