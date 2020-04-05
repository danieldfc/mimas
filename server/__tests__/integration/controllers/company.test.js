import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Company store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new company', async () => {
    const user = await factory.create('User');
    const company = await factory.attrs('Company');

    const response = await request(app)
      .post('/companies')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(company);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new company without fields', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .post('/companies')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Validation failure'),
      }),
    });
  });

  it('should not be able register a new company with duplicated email', async () => {
    const user = await factory.create('User');
    const company = await factory.attrs('Company');

    await request(app)
      .post('/companies')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(company);

    const response = await request(app)
      .post('/companies')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(company);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Company already exist'),
      }),
    });
  });
});
