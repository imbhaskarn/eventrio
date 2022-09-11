require('dotenv').config();
const AWS = require('aws-sdk');

const getParams = (phoneNumber, otp) => ({
    Message: `Your verification code is ${otp}`,
    PhoneNumber: `${phoneNumber}`,
    MessageAttributes: {
        'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: 'OTP-SEND'
        },
        'AWS.SNS.SMS.SMSType': {
            DataType: 'String',
            StringValue: 'Transactional'
        }
    }
});

module.exports = (phoneNumber, otp) => {
    if (phoneNumber === 'undefined' && typeof otp == 'undefined') {
        return new Error('invalid input for phone number');
    }
    const pattern = /^((\+)91)([6789]\d{9})$/;
    if (!pattern.test(phoneNumber)) {
        return new Error('Invalid phone number');
    }
    return new AWS.SNS({ apiVersion: '2022-08-04' }).publish(getParams(phoneNumber, otp)).promise();
};
