require('dotenv').config();
const accountSid = process.env.twilio_accountSid;
const authToken = process.env.twilio_authToken;
const client = require('twilio')(accountSid, authToken);

module.exports = (phoneNumber, otp) => {
    if (phoneNumber === 'undefined' && typeof otp == 'undefined') {
        return new Error('invalid input for phone number');
    }
    const pattern = /^((\+)91)([6789]\d{9})$/;
    if (!pattern.test(phoneNumber)) {
        return new Error('Invalid phone number');
    }
    return client.messages
        .create({
            body: `Your verification code is ${otp}`,
            messagingServiceSid: process.env.twilio_messagingServiceSid,
            to: phoneNumber
        })
        .done();
};
