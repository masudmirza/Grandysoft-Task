'use strict';
import {
  Model, UUIDV4
} from 'sequelize';

interface ISubscription {
  id: string;
  senderId: string;
  receiverId: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Subscription extends Model<ISubscription>
  implements ISubscription {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    senderId!: string;
    receiverId!: string;
    static associate(models: any) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'senderId' })
      this.belongsTo(models.User, { foreignKey: 'receiverId' })
    }
  }
  Subscription.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    senderId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    },
    receiverId: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};