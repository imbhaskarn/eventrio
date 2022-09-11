/* eslint-disable no-undef */
const request = require('supertest');
const express = require('express');
const app = express();

const router = require('../src/routes/user.routes');

app.use('/', router);

describe('GET test', () => {
    test('index route works', async () => {
        await request(app)
            .post('/signup')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
                res.body.success = true;
            });
    });
});
