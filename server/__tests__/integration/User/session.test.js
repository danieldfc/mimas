import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../utils/truncate';

describe('User sessions', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should authenticate with valid credentials return jwt token when authenticate', async () => {
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
    expect(response.body).toHaveProperty('token');
  });

  it('should authenticate without credentials', async () => {
    const response = await request(app).post('/sessions');

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: { message: 'Validation failure' },
    });
  });

  it('should authenticate with credentials but user not found', async () => {
    const response = await request(app)
      .post('/sessions')
      .send({
        email: 'test@test.com',
        password: '123456',
      });

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: { message: 'User not found' },
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

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'Password does not match' },
    });
  });
});
