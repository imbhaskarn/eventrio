'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('package_carts', 'user_id', Sequelize.INTEGER);
        await queryInterface.addConstraint('package_carts', {
            fields: ['user_id'],
            type: 'FOREIGN KEY',
            name: 'package_cart_user_fkey',
            references: {
                table: 'users',
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
        await queryInterface.removeConstraint('package_carts', 'package_cart_user_fkey');
        await queryInterface.removeColumn('package_carts', 'user_id');
    }
};
