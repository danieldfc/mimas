import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../utils/truncate';

describe('Client store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new client', async () => {
    const user = await factory.create('User');

    const client = await factory.attrs('Client');

    const response = await request(app)
      .post('/clients')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(client);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new client with duplicated', async () => {
    const user = await factory.create('User');

    const client = await factory.attrs('Client');

    await request(app)
      .post('/clients')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(client);

    const response = await request(app)
      .post('/clients')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(client);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Client already exist' },
    });
  });

  it('should not be able register a new client without fields', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/clients')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: { message: 'Validation failure' },
    });
  });

  it('should be able register a new client but without authorization token', async () => {
    const client = await factory.attrs('Client');

    const response = await request(app)
      .post('/clients')
      .send(client);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'TOKEN not provided' },
    });
  });

  it('should be able register a new client but with invalid authorization token', async () => {
    const client = await factory.attrs('Client');

    const response = await request(app)
      .post('/clients')
      .set('Authorization', 'Bearer 123')
      .send(client);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'TOKEN invalid' },
    });
  });
});
