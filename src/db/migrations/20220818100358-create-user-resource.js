'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('user_resources', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            row_status: {
                // eslint-disable-next-line new-cap
                type: Sequelize.ENUM('active', 'inactive'),
                defaultValue: 'active'
            },
            otp: {
                type: Sequelize.STRING
            },
            otp_expiration_date: {
                type: Sequelize.DATE
            },
            extra_details: {
                type: Sequelize.TEXT
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }
        });
        await queryInterface.addConstraint('user_resources', {
            fields: ['user_id'],
            type: 'FOREIGN KEY',
            name: 'user_resource_users_association',
            references: {
                table: 'users',
                field: 'id'
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('user_resources', 'user_resource_users_association');
        await queryInterface.dropTable('user_resources');
    }
};
