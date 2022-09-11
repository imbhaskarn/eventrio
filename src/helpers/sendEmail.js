/* eslint-disable no-async-promise-executor */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const ejs = require('ejs');
const path = require('path');
const otpTemaplte = path.join(__dirname, '../public/views/otpemail.ejs');
const nodemailer = require('nodemailer');
const config = require('../config/config');

const transporter = nodemailer.createTransport(config.mailAuth);

const sendOTP = (to, otp) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (to === 'undefined' && typeof otp == 'undefined') {
                return new Error('invalid input for email');
            }
            const emailTemplate = await ejs.renderFile(otpTemaplte, { VERIFICATION_CODE: otp });
            const result = await transporter.sendMail({
                from: 'noreply@nextinstudio.com',
                to: to,
                subject: 'OTP for email verification',
                html: emailTemplate
            });
            if (result) {
                return resolve(result);
            }
        } catch (error) {
            return reject(error);
        }
    });
};

module.exports = sendOTP;
