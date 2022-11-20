'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface IUser {
  id: string;
  firstname: string;
  gender: string;
};

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUser>
  implements IUser {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    firstname!: string;
    gender!: string;
    static associate(models: any) {
      // define association here
      this.hasMany(models.Subscription, { foreignKey: 'senderId' })
      this.hasMany(models.Subscription, { foreignKey: 'receiverId' })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue:UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};