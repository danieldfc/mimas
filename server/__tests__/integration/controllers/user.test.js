import bcrypt from 'bcryptjs';
import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

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
      error: expect.objectContaining({
        message: expect.stringContaining('Validation failure'),
      }),
    });
  });

  it('should not be able register a new user already existing', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('User already exist'),
      }),
    });
  });

  it('should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
