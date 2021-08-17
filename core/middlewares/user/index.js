module.exports = {
    createMiddleware: require('./is-user-valid.middleware'),
    updateMiddleware: require('./check-is-update-user.middleware'),
    idMiddleware: require('./check-is-id-valid.middleware'),
    activateToken: require('./check-is-activate-token'),
    changePassword: require('./check-is-changePassword'),
    forgotToken: require('./check-is-forgot-password'),
    emailValidIsCreatForgotToken: require('./check-is-email-create-forgot-token'),
};
