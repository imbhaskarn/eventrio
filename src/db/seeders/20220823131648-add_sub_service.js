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
        return queryInterface.bulkInsert('sub_services', [
            {
                name: 'burger',
                image_url: 'http://sample.url.com/image1.png',
                service_id: 1,
                price: 10,
                row_status: 'active'
            },
            {
                name: 'milk shake',
                image_url: 'http://sample.url.com/image2.png',
                price: 10,
                service_id: 1,
                row_status: 'active'
            },
            {
                name: 'santa clause dress',
                image_url: 'http://sample.url.com/image3.png',
                price: 29.44,
                service_id: null,
                row_status: 'active'
            },
            {
                name: 'balloons',
                image_url: 'http://sample.url.com/image4.png',
                price: 45.99,
                service_id: 2,
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
        return queryInterface.bulkDelete('sub_services', null, {});
    }
};
