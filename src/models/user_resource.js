/* eslint-disable require-jsdoc */
/* eslint-disable camelcase */
/* eslint-disable valid-jsdoc */
const moment = require('moment');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user_resource extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            user_resource.belongsTo(models.user, { foreignKey: 'user_id' });
            models.user.hasMany(user_resource, { foreignKey: 'user_id' });
        }
    }
    user_resource.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            otp: {
                type: DataTypes.STRING,
                allowNull: false
            },
            row_status: {
                // eslint-disable-next-line new-cap
                type: DataTypes.ENUM('active', 'inactive'),
                defaultValue: 'active'
            },
            otp_expiration_date: {
                type: DataTypes.DATE,
                set(value) {
                    value = moment(value).add(5, 'minutes');
                    this.setDataValue('otp_expiration_date', value);
                }
            },
            is_otp_expired: {
                type: DataTypes.VIRTUAL,
                get() {
                    // eslint-disable-next-line no-undef
                    return this.getDataValue(otp_expiration_date).isAfter(moment()) ? true : false;
                }
            },
            extra_details: {
                type: DataTypes.TEXT
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            is_not_expired: {
                type: DataTypes.VIRTUAL,
                get() {
                    return moment(this.createdAt).isAfter(
                        moment(new Date(Date.now() - 10000 * 60))
                    );
                }
            }
        },
        {
            sequelize,
            modelName: 'user_resource'
        }
    );
    return user_resource;
};
