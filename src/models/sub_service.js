/* eslint-disable camelcase */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    // eslint-disable-next-line require-jsdoc, camelcase
    class sub_service extends Model {
        // eslint-disable-next-line valid-jsdoc
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            sub_service.belongsTo(models.service, { foreignKey: 'service_id' });
            models.service.hasMany(sub_service, { foreignKey: 'service_id' });
        }
    }
    sub_service.init(
        {
            name: DataTypes.STRING,
            image_url: DataTypes.STRING,
            service_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            price: {
                type: DataTypes.DOUBLE,
                defaultValue: 0
            },
            price_type: DataTypes.STRING,
            row_status: {
                // eslint-disable-next-line new-cap
                type: DataTypes.ENUM('active', 'inactive'),
                allowNull: false,
                defaultValue: 'active'
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Date.now()
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: Date.now()
            }
        },
        {
            sequelize,
            modelName: 'sub_service'
        }
    );
    return sub_service;
};
