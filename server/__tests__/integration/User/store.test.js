import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../utils/truncate';

describe('User store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new user', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new user without data', async () => {
    const response = await request(app).post('/users');

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: { message: 'Validation failure' },
    });
  });

  it('should not be able register a new user already existing', async () => {
    await factory.create('User', {
      email: 'test@test.com',
    });

    const user = await factory.attrs('User', {
      email: 'test@test.com',
    });

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'User already exist' },
    });
  });
});
