/* eslint-disable camelcase */
/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class package_cart extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            package_cart.belongsTo(models.user, { foreignKey: 'user_id' });
            models.user.hasMany(package_cart, { foreignKey: 'user_id' });
        }
    }
    package_cart.init(
        {
            user_id: DataTypes.INTEGER,
            image_url: DataTypes.STRING,
            name: DataTypes.STRING,
            total_price: DataTypes.DECIMAL,
            location_service_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            date: DataTypes.STRING,
            time: DataTypes.STRING,
            status: {
                // eslint-disable-next-line new-cap
                type: DataTypes.ENUM('pending', 'confirm', 'completed'),
                defaultValue: 'pending',
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
            modelName: 'package_cart'
        }
    );
    return package_cart;
};
