'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Subscription extends sequelize_1.Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { as: 'subscription', foreignKey: 'userId' });
        }
    }
    Subscription.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        subscriptions: {
            type: DataTypes.ARRAY(DataTypes.JSON)
        }
    }, {
        sequelize,
        modelName: 'Subscriptions',
    });
    return Subscription;
};
