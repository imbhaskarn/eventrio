'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('payments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            package_id: {
                type: Sequelize.INTEGER
            },
            payment_request_id: {
                type: Sequelize.STRING
            },
            payment_status: {
                type: Sequelize.STRING
            },
            amount: {
                type: Sequelize.DECIMAL
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
        await queryInterface.addConstraint('payments', {
            fields: ['package_id'],
            type: 'FOREIGN KEY',
            name: 'payments_package_fkey',
            references: {
                table: 'package_carts',
                field: 'id'
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('payments', 'payments_package_fkey');
        await queryInterface.dropTable('payments');
    }
};
