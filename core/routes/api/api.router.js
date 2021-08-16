const router = require('express').Router();

const userRouter = require('../user');
const authRouter = require('../auth');
const mailRouter = require('../mail');
const todoRouter = require('../todo');

router.use('/auth', authRouter);
router.use('/users', userRouter);
router.use('/email', mailRouter);
router.use('/todo', todoRouter);

module.exports = router;
