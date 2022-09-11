/* eslint-disable camelcase */
/* eslint-disable require-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class service_package extends Model {
        // eslint-disable-next-line valid-jsdoc
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            service_package.belongsTo(models.service, { foreignKey: 'service_id' });
            models.service.hasMany(service_package, { foreignKey: 'service_id' });

            service_package.belongsTo(models.package_cart, { foreignKey: 'package_cart_id' });
            models.package_cart.hasMany(service_package, { foreignKey: 'package_cart_id' });
        }
    }
    service_package.init(
        {
            service_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            package_cart_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            sub_service: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            price: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            total_service_price: DataTypes.DECIMAL,
            total_guest: DataTypes.INTEGER
        },
        {
            sequelize,
            modelName: 'service_package'
        }
    );
    return service_package;
};
