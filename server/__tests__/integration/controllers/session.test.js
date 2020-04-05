import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Session Store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(200);
  });

  it('should return jwt token when authenticate', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.body).toHaveProperty('token');
  });

  it('should not be able authenticate without credentials', async () => {
    const response = await request(app).post('/sessions');

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Validation failure'),
      }),
    });
  });

  it('should not be able authenticate without user', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('User not found'),
      }),
    });
  });

  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123456',
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Password does not match'),
      }),
    });
  });
});
