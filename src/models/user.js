/* eslint-disable require-jsdoc */
'use strict';

const moment = require('moment');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    user.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING,
                unique: true
            },
            email_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            mobile: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false
            },
            mobile_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            city: DataTypes.STRING,
            date_of_birth: {
                type: DataTypes.DATEONLY,
                get: function () {
                    return moment.utc(this.getDataValue('regDate')).format('DD/MM/YYYY');
                }
            },
            gender: {
                // eslint-disable-next-line new-cap
                type: DataTypes.ENUM('male', 'female', 'others')
            },
            image_url: DataTypes.STRING,
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'user'
        }
    );
    return user;
};
