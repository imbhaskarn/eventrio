'use strict';

require('dotenv').config();
const APP_PORT = process.env.APP_PORT || '5000';
const env = process.env.NODE_ENV || 'test';

const config = {
    // use_env_variable: 'development',
    APP_HOST: '0.0.0.0',
    APP_PORT: APP_PORT,
    JWT_SECRET: 'f271e206119433acadc4hd',
    development: {
        username: process.env.DB_USER ,,
        password:
            process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST ,
        port: process.env.DB_PORT ,
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true, // This will help you. But you will see new error
                rejectUnauthorized: false // This line will fix new error
            }
        }
    },
    test: {
        username: 'postgres',
        password: '1234',
        database: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        dialect: 'postgres',
        logging: process.env.LOGGING == null ? false : console.log
    },
    mailAuth: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    }
};
process.env.LOGGING == null ? false : console.log(config[env]);
module.exports = config;
