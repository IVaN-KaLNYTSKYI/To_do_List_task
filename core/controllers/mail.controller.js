const { userService } = require('../services');

module.exports = {
    activatedAccount: async (req, res, next) => {
        try {
            await userService.updateUser({ _id: req.user._id }, { activate_status: true, activate_token: null });

            res.json({
                text:"ACTIVATE:TRUE"
            });
        } catch (e) {
            next(e);
        }
    },

    forgotToken: async (req, res, next) => {
        try {
            const { obj: { user: { _id, email, name }, forgot_token } } = req;

            await userService.updateUser({ _id }, { forgot_token });

            await mailService.sendMail(email, emailActionEnum.FORGOT, { userName: name, token: forgot_token });

            res.json('check mail');
        } catch (e) {
            next(e);
        }
    },
};
