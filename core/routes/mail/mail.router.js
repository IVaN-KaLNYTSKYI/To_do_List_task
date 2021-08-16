const router = require('express').Router();

const { isUserValid } = require('../../middlewares');
const { mailController } = require('../../controllers');

router.get('/activate', isUserValid.activateToken, mailController.activatedAccount);

module.exports = router;
