
const router = require('express').Router();

const { isUserValid, authValid} = require('../../middlewares');
const { mailController } = require('../../controllers');

router.get('/activate', isUserValid.activateToken, mailController.activatedAccount);

router.post('/forgotPassword', authValid.checkAccessToken, isUserValid.emailValidIsCreatForgotToken, mailController.forgotToken);

module.exports = router;
