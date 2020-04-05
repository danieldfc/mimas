import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Client Store', () => {
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

  it('should not be able register a new client with duplicated email', async () => {
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
      error: expect.objectContaining({
        message: expect.stringContaining('Validation failure'),
      }),
    });
  });
});

describe('Client Index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able list clients', async () => {
    const user = await factory.create('User');
    const client = await factory.create('Client');

    const response = await request(app)
      .get('/clients')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toEqual(client.id);
  });

  it('should not be able if not exists JWT token', async () => {
    const response = await request(app).get('/clients');

    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('TOKEN not provided'),
      }),
    });
  });

  it('should not be able if JWT token invalid', async () => {
    const response = await request(app)
      .get('/clients')
      .set('Authorization', 'Bearer 123456');

    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('TOKEN invalid'),
      }),
    });
  });
});
