import factory from 'factory-girl';
import faker from 'faker';

import Client from '../src/app/models/Client';
import Company from '../src/app/models/Company';
import Product from '../src/app/models/Product';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Client', Client, {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumberFormat(1),
  address: faker.address.streetAddress('###'),
});

factory.define('Company', Company, {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  address: faker.address.streetAddress('###'),
  phone: faker.phone.phoneNumberFormat(1),
});

factory.define('Product', Product, {
  name: faker.name.firstName(),
  price: faker.random.number(),
  amount: faker.random.number(),
});

export default factory;
