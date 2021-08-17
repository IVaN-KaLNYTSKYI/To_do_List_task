module.exports = {
    createValidator: require('./create-user.validator'),
    updateValidator: require('./update-user.validator'),
    idValidator: require('./id-user.validator'),
    emailValidator: require('./email-validator'),
    changePassword: require('./changePassword'),
    forgotPasswordValidator: require('./forgot-password-validator'),
};
