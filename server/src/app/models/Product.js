import { Model, DataTypes } from 'sequelize';

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        amount: DataTypes.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Company, {
      foreignKey: 'product_id',
      through: 'product_companies',
      as: 'companies',
    });
  }
}

export default Product;
