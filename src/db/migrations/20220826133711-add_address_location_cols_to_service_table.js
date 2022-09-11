'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('services', 'address', Sequelize.STRING);
        await queryInterface.addColumn('services', 'longitude', Sequelize.STRING);
        await queryInterface.addColumn('services', 'latitude', Sequelize.STRING);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeColumn('services', 'address');
        await queryInterface.removeColumn('services', 'longitude');
        await queryInterface.removeColumn('services', 'latitude');
    }
};
