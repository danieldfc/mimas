import Sequelize from 'sequelize';

import Client from '../app/models/Client';
import Company from '../app/models/Company';
import Product from '../app/models/Product';
import User from '../app/models/User';

import dbConfig from '../config/database';

const models = [User, Company, Product, Client];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
