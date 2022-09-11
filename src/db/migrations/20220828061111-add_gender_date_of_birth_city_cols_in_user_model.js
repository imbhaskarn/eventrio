'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.addColumn('users', 'city', Sequelize.STRING);
        await queryInterface.addColumn('users', 'date_of_birth', Sequelize.DATEONLY);
        await queryInterface.addColumn('users', 'gender', Sequelize.STRING);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        const t = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeColumn('users', 'city', { transaction: t });
            await queryInterface.removeColumn('users', 'date_of_birth', { transaction: t });
            await queryInterface.removeColumn('users', 'gender', { transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
};
