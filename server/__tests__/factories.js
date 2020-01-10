import factory from 'factory-girl';
import faker from 'faker';

import Client from '../src/app/models/Client';
import User from '../src/app/models/User';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Client', Client, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  phone: faker.phone.phoneNumberFormat(1),
  address: faker.address.streetAddress('###'),
});

export default factory;
