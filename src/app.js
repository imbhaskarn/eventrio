require('dotenv').config();
const express = require('express');
const app = express(); // initialize app
const userRoute = require('./routes/user.routes');
const isLoggedIn = require('./helpers/validation/validateToken');
const { testWithoutDB, testWithDB } = require('./controllers/testController');

app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// test routes
app.get('/test_without_db', testWithoutDB);
app.get('/test_db', testWithDB);
app.get('/verify', isLoggedIn, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'You are logged in!',
        userId: req.payload.userID
    });
});

app.use('/api/v1', userRoute);

// app.use('/*', (req, res, next) => {
//   res.status(404).json({
//     result: false,
//     message: 'Not Found'
//   });
// });

module.exports = app;
