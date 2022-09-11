const Joi = require('joi');

const checkMobile = (body) => {
    return Joi.object({
        mobile: Joi.string()
            .length(13)
            .regex(/^((\+)91)([6789]\d{9})$/)
            .required()
    }).validate(body);
};

const checkMobileAndOtp = (body) => {
    return Joi.object({
        mobile: Joi.string()
            .length(13)
            .regex(/^((\+)91)([6789]\d{9})$/)
            .required(),
        otp: Joi.string().length(6).required()
    }).validate(body);
};

module.exports = { checkMobile, checkMobileAndOtp };
