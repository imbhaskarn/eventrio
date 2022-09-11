/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable valid-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class service_type extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    service_type.init(
        {
            name: DataTypes.STRING,
            row_status: {
                // eslint-disable-next-line new-cap
                type: DataTypes.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active'
            },
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
            modelName: 'service_type'
        }
    );
    return service_type;
};
