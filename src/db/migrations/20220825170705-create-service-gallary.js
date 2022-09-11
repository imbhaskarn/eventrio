'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('service_gallaries', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            image_url: {
                type: Sequelize.STRING
            },
            service_id: {
                type: Sequelize.INTEGER
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
        await queryInterface.addConstraint('service_gallaries', {
            fields: ['service_id'],
            type: 'FOREIGN KEY',
            name: 'service_gallaries_service_fk',
            references: {
                table: 'services',
                field: 'id'
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.removeConstraint('service_gallaries', 'service_gallaries_service_fk');
        await queryInterface.dropTable('service_gallaries');
    }
};
