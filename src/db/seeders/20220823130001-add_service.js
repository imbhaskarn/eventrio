'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        return queryInterface.bulkInsert('services', [
            {
                name: 'Food Rok',
                image_url: 'http://sample.url.com/image1.png',
                row_status: 'active'
            },
            {
                name: 'Decorations Club',
                image_url: 'http://sample.url.com/image2.png',
                row_status: 'active'
            },
            {
                name: 'Rohan Hotel',
                image_url: 'http://sample.url.com/image3.png',
                row_status: 'active'
            }
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete('services', null, {});
    }
};
