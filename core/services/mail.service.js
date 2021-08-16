const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const { constants } = require('../constants');
const templateInfo = require('../email-templates');
const { ErrorHandler } = require('../errors');
const { errorMess, codesEnum } = require('../errors');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: constants.EMAIL,
        pass: constants.PASSWORD_EMAIL
    }
});

const sendMail = async (userMail, action, context = {}) => {
    const templateToSend = templateInfo[action];

    if (!templateToSend) {
        throw new ErrorHandler(codesEnum.SERVER_ERROR, errorMess.WRONG_MAIL_ACTION.message, errorMess.WRONG_MAIL_ACTION.code);
    }
    const html = await templateParser.render(templateToSend.templateName, context);
    await transporter.sendMail({
        from: 'No Reply',
        to: userMail,
        subject: templateToSend.subject,
        html
    });
};

module.exports = {
    sendMail
};
