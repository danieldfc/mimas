import { Model, DataTypes } from 'sequelize';

class Client extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        address: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Client;
