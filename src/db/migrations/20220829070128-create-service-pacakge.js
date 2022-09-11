'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('service_pacakges', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            service_id: {
                type: Sequelize.INTEGER
            },
            package_cart_id: {
                type: Sequelize.INTEGER
            },
            total_service_price: {
                type: Sequelize.DECIMAL
            },
            total_guest: {
                type: Sequelize.INTEGER
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
        await queryInterface.addColumn('sub_services', 'price_type', Sequelize.STRING);
        await queryInterface.addConstraint('service_pacakges', {
            fields: ['service_id'],
            type: 'FOREIGN KEY',
            name: 'service_pacakges_service_fk',
            references: {
                table: 'services',
                field: 'id'
            }
        });
        await queryInterface.addConstraint('service_pacakges', {
            fields: ['package_cart_id'],
            type: 'FOREIGN KEY',
            name: 'service_pacakges_package_cart_fk',
            references: {
                table: 'package_carts',
                field: 'id'
            }
        });
    },
    async down(queryInterface, Sequelize) {
        const t = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeConstraint(
                'service_pacakges',
                'service_pacakges_service_fk',
                { transaction: t }
            );
            await queryInterface.removeConstraint(
                'service_pacakges',
                'service_pacakges_package_cart_fk',
                { transaction: t }
            );
            await queryInterface.dropTable('service_pacakges', { transaction: t });
            await queryInterface.removeColumn('sub_services', 'price_type', { transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
};
