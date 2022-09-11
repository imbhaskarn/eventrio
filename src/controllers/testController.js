const db = require('../models');
const testDB = async (_, res) => {
    const result = await db.sequelize.query('SELECT NOW()', { raw: true, plain: true });
    return res.status(200).json({
        success: true,
        message: `Hello, From DB`,
        timestamp: result.now
    });
};

const testWithoutDB = (_, res) => {
    return res.status(200).json({
        success: true,
        message: `Hello, From Eventrio`,
        timestamp: new Date()
    });
};

module.exports = {
    testWithDB: testDB,
    testWithoutDB: testWithoutDB
};
