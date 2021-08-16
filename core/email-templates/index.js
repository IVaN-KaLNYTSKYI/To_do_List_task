const { emailActionEnum } = require('../constants');

module.exports = {
    [emailActionEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on board'
    },

    [emailActionEnum.REMOVE]: {
        templateName: 'remove',
        subject: 'remove user'
    },

    [emailActionEnum.UPDATE]: {
        templateName: 'update',
        subject: 'update user'
    }
};
