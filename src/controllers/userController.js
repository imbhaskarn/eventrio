const sendOTPToMobile = require('../helpers/sendOTP');
const db = require('../models/index');
const JWT = require('jsonwebtoken');
const { checkMobile, checkMobileAndOtp } = require('../helpers/validation/joiValidation');
const config = require('../config/config');

const authorizeUser = async (req, res) => {
    const validationResult = checkMobile(req.body);
    if (validationResult.error) {
        return res.status(400).json({ success: false, message: validationResult.error });
    }

    const user = await db.user.findOrCreate({ where: { mobile: req.body.mobile } });
    const OTP = Math.floor(100000 + Math.random() * 988888);
    console.log(OTP);
    db.user_resource
        .create({ user_id: user[0].dataValues.id, otp: OTP, row_status: 'active' })
        .then(async (result) => {
            if (result) {
                const resultStatus = await sendOTPToMobile(req.body.mobile, OTP);
                if (resultStatus) {
                    return res
                        .status(200)
                        .json({ success: true, message: 'Otp sent succefully to mobile' });
                }
            }
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Internal server error' });
        });
};

const authorizeUserLogin = async (req, res) => {
    // if user exists and there is otp then verify otp
    const validationResult = checkMobileAndOtp(req.body);
    if (validationResult.error) {
        return res.status(200).json({ success: false, message: validationResult.error });
    }
    const user = await db.user.findOne({ where: { mobile: req.body.mobile } });
    if (req.body.otp && user) {
        const userResourceData = await db.user_resource.findOne({
            where: { user_id: user.dataValues.id, otp: req.body.otp }
        });
        if (userResourceData) {
            if (userResourceData.is_not_expired) {
                const authToken = JWT.sign({ userID: user.dataValues.id }, config.JWT_SECRET, {
                    expiresIn: '60d'
                });

                res.header('Authorization', `Bearer ${authToken}`);
                return res.status(200).json({
                    success: true,
                    message: 'Login successful',
                    data: { user_id: user.dataValues.id, registerd: user.name ? true : false }
                });
            } else {
                return res.status(410).json({ success: false, message: 'Otp is expired' });
            }
        }
        return res.status(400).json({ success: false, message: 'Otp does not match' });
    }
    return res.status(400).json({ success: false, message: 'Invalid user or otp' });
};

const userProfileCreateApi = async (req, res) => {
    let t;
    const data = req.body;
    try {
        t = await db.sequelize.transaction();
        const userID = req.payload.userID;
        await db.user.update(
            {
                name: data.name,
                email: data.email,
                city: data.city,
                gender: data.gender,
                date_of_birth: data.dob,
                image_url: data.image_url
            },
            { where: { id: userID } },
            { transaction: t }
        );
        await t.commit();
        return res
            .status(201)
            .json({ success: true, message: 'User profile added', data: { userID: userID } });
    } catch (err) {
        console.log(err);
        if (t) {
            await t.rollback();
        }
        return res.status(500).send({ status: false, message: 'Error' });
    }
};

const userProfileFetchApi = async (req, res) => {
    const userID = req.payload && req.payload.userID;
    if (userID) {
        const userInfo = await db.user.findByPk(userID);
        if (!userInfo) {
            return res.status(404).send({ status: false, message: 'User profile not found' });
        }
        const data = {
            profileImage: userInfo.dataValues.image_url,
            name: userInfo.dataValues.name,
            city: userInfo.dataValues.city,
            email: userInfo.dataValues.email,
            gender: userInfo.dataValues.gender
        };
        return res.status(200).json({ status: true, data: data });
    } else {
        return res.status(403).json({ status: false, message: 'auth failed' });
    }
};

const userProfileByIDFetchApi = async (req, res) => {
    const userID = req.query.user_id;
    if (userID) {
        const userInfo = await db.user.findByPk(userID);
        if (!userInfo) {
            return res.status(404).send({ status: false, message: 'User profile not found' });
        }
        const data = {
            profileImage: userInfo.dataValues.image_url,
            name: userInfo.dataValues.name,
            city: userInfo.dataValues.city,
            email: userInfo.dataValues.email,
            gender: userInfo.dataValues.gender
        };
        return res.status(200).json({ status: true, data: data });
    } else {
        return res.status(403).json({ status: false, message: 'auth failed' });
    }
};

module.exports = {
    authorizeUser,
    authorizeUserLogin,
    userProfileCreateApi,
    userProfileFetchApi,
    userProfileByIDFetchApi
};
