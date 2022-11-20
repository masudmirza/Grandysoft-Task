'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Friends extends sequelize_1.Model {
        static associate(models) {
            // define association here
            this.belongsTo(models.User, { as: 'friendships', foreignKey: 'userId' });
        }
    }
    Friends.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: sequelize_1.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        friends: {
            type: DataTypes.ARRAY(DataTypes.JSON)
        }
    }, {
        sequelize,
        modelName: 'Friends',
    });
    return Friends;
};
