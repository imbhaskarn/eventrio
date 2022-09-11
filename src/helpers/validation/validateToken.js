const config = require('../../config/config');
const jwt = require('jsonwebtoken');

const collectToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
};

module.exports = async (req, res, next) => {
    const token = collectToken(req);
    if (!token) {
        return res.status(401).json({
            success: false,
            massage: 'Authorization token is not provided'
        });
    }
    jwt.verify(token, config.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({
                success: false,
                massage: 'Authorization token is Expired'
            });
        }
        req.payload = payload;
    });
    next();
};
