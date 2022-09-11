/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable valid-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class service_gallary extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            service_gallary.belongsTo(models.service, { foreignKey: 'service_id' });
            models.service.hasMany(service_gallary, { foreignKey: 'service_id' });
        }
    }
    service_gallary.init(
        {
            image_url: DataTypes.STRING,
            service_id: {
                type: DataTypes.INTEGER,
                allowNull: false
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
            modelName: 'service_gallary'
        }
    );
    return service_gallary;
};
