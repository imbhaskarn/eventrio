'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('sub_services', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            image_url: {
                type: Sequelize.STRING,
                allowNull: true
            },
            service_id: {
                type: Sequelize.INTEGER,
                allowNull: true
            },
            price: {
                type: Sequelize.DOUBLE,
                allowNull: false,
                defaultValue: 0
            },
            row_status: {
                type: Sequelize.STRING
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
        await queryInterface.addConstraint('sub_services', {
            fields: ['service_id'],
            type: 'FOREIGN KEY',
            name: 'sub_service_service_fk',
            references: {
                table: 'services',
                field: 'id'
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('sub_services', 'sub_service_service_fk');
        await queryInterface.dropTable('sub_services');
    }
};
