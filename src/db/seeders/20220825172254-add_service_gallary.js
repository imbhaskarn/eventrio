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
        return queryInterface.bulkInsert('service_gallaries', [
            {
                image_url: 'http://sample.url.com/image1.png',
                service_id: 1
            },
            {
                image_url: 'http://sample.url.com/image2.png',
                service_id: 1
            },
            {
                image_url: 'http://sample.url.com/image3.png',
                service_id: 1
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
        return queryInterface.bulkDelete('service_gallaries', null, {});
    }
};
