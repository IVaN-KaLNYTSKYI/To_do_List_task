const router = require('express').Router();
const { authController } = require('../../controllers');
const { authValid } = require('../../middlewares');

router.post('/login', authValid.authLogin, authController.login);
router.post('/logout', authValid.checkAccessToken, authController.logout);
router.post('/refresh', authValid.checkRefreshToken, authController.refresh);

module.exports = router;
