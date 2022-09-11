/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class service extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    service.init(
        {
            name: DataTypes.STRING,
            image_url: DataTypes.STRING,
            service_type: DataTypes.STRING,
            service_type_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            about: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            phone_number: DataTypes.INTEGER,
            row_status: {
                // eslint-disable-next-line new-cap
                type: DataTypes.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active'
            },
            address: DataTypes.STRING,
            latitude: DataTypes.STRING,
            longitude: DataTypes.STRING,
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        },
        {
            sequelize,
            modelName: 'service'
        }
    );
    return service;
};
