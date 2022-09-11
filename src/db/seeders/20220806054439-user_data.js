module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                mobile: '+919555555555',
                mobile_verified: true
            },
            {
                mobile: '+919555555551',
                mobile_verified: true
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
