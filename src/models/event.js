/* eslint-disable require-jsdoc */
'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class event extends Model {
        static associate(models) {
            // define association here
            event.belongsTo(models.user, { foreignKey: 'user_id' });
            models.user.hasMany(event, { foreignKey: 'user_id' });
        }
    }
    event.init(
        {
            image_url: DataTypes.STRING,
            user_id: DataTypes.INTEGER,
            descreption: DataTypes.TEXT,
            services: {
                // eslint-disable-next-line new-cap
                type: DataTypes.ARRAY(DataTypes.INTEGER)
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
            modelName: 'event'
        }
    );
    return event;
};
