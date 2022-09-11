'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('events', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            image_url: {
                type: Sequelize.STRING
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            descreption: {
                type: Sequelize.TEXT
            },
            services: {
                // eslint-disable-next-line new-cap
                type: Sequelize.ARRAY(Sequelize.INTEGER)
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
        await queryInterface.addConstraint('events', {
            fields: ['user_id'],
            type: 'FOREIGN KEY',
            name: 'event_users_fk',
            references: {
                table: 'users',
                field: 'id'
            }
        });
    },
    async down(queryInterface, Sequelize) {
        const t = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeConstraint('events', 'event_users_fk', { transaction: t });
            await queryInterface.dropTable('events', { transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
};
