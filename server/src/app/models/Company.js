import { Model, DataTypes } from 'sequelize';

class Company extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        address: DataTypes.STRING,
        phone: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Product, {
      foreignKey: 'company_id',
      through: 'product_companies',
      as: 'products',
    });
  }
}

export default Company;
