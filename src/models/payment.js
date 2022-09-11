/* eslint-disable valid-jsdoc */
/* eslint-disable require-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            payment.belongsTo(models.package_cart, { foreignKey: 'package_id' });
            models.package_cart.hasMany(payment, { foreignKey: 'package_id' });
        }
    }
    payment.init(
        {
            package_id: DataTypes.INTEGER,
            payment_request_id: DataTypes.STRING,
            payment_status: {
                // eslint-disable-next-line new-cap
                type: DataTypes.ENUM('paid', 'pending', 'unpaid'),
                defaultValue: 'pending'
            },
            amount: DataTypes.DECIMAL
        },
        {
            sequelize,
            modelName: 'payment'
        }
    );
    return payment;
};
