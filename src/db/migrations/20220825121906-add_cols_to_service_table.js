'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('services', 'about', Sequelize.TEXT);
        await queryInterface.addColumn('services', 'phone_number', Sequelize.STRING);
        await queryInterface.addColumn('services', 'service_type_id', {
            type: Sequelize.INTEGER,
            allowNull: true
        });
        await queryInterface.addConstraint('services', {
            fields: ['service_type_id'],
            type: 'FOREIGN KEY',
            name: 'service_service_type_fk',
            references: {
                table: 'service_types',
                field: 'id'
            }
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.removeConstraint('services', 'service_service_type_fk');
        await queryInterface.removeColumn('services', 'about');
        await queryInterface.removeColumn('services', 'phone_number');
        await queryInterface.removeColumn('services', 'service_type_id');
    }
};
