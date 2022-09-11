const express = require('express');
const isLoggedIn = require('../helpers/validation/validateToken');

const router = new express.Router();
const {
    authorizeUser,
    authorizeUserLogin,
    userProfileCreateApi,
    userProfileFetchApi,
    userProfileByIDFetchApi
} = require('../controllers/userController');
const { subServiceCreateApi, subServiceUpdateApi } = require('../controllers/subServiceController');
const { serviceCreateApi, serviceFetchApi } = require('../controllers/serviceController');

const {
    packageCreateApi,
    packageServiceAddApi,
    packageFetchApi
} = require('../controllers/packageController');
const { eventCreateApi } = require('../controllers/eventController');
const { paymentCreateAPI } = require('../controllers/paymentController');

router.post('/auth', authorizeUser);

router.post('/auth/user', authorizeUserLogin);

// user profile
router.post('/user/profile', isLoggedIn, userProfileCreateApi);
router.get('/user/profile', isLoggedIn, userProfileFetchApi);
router.get('/user/profilebyid', userProfileByIDFetchApi);

// service
router.get('/service', serviceFetchApi);
router.post('/service', serviceCreateApi);

// sub_service
router.post('/service/sub_service', subServiceCreateApi);
router.put('/service/sub_service', subServiceUpdateApi);

// package
router.get('/package', isLoggedIn, packageFetchApi);
router.post('/package', isLoggedIn, packageCreateApi);
router.post('/package/service', isLoggedIn, packageServiceAddApi);

// user profile
router.post('/event/profile', isLoggedIn, eventCreateApi);

// payment
router.post('/payment', isLoggedIn, paymentCreateAPI);

module.exports = router;
