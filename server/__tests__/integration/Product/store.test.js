import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../utils/truncate';

describe('Product store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new product', async () => {
    const user = await factory.create('User');
    const company = await factory.attrs('Company');

    const {
      body: { id },
    } = await request(app)
      .post('/companies')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(company);

    const product = await factory.attrs('Product');

    const response = await request(app)
      .post(`/companies/${id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(product);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new product without company', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/companies/999/products')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: { message: 'Company not found' },
    });
  });

  it('should not be able register a new product with duplicated product', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');

    const product = await factory.attrs('Product');

    await request(app)
      .post(`/companies/${company.id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(product);

    const response = await request(app)
      .post(`/companies/${company.id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(product);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: { message: 'Product already exist' },
    });
  });

  it('should not be able register a new product without fields', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');

    const response = await request(app)
      .post(`/companies/${company.id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(403);
  });

  it('should be able register a new product but without authorization token', async () => {
    const product = await factory.attrs('Product');

    const response = await request(app)
      .post('/companies/1/products')
      .send(product);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'TOKEN not provided' },
    });
  });

  it('should be able register a new product but with invalid authorization token', async () => {
    const product = await factory.attrs('Product');

    const response = await request(app)
      .post('/companies/1/products')
      .set('Authorization', 'Bearer 123')
      .send(product);

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'TOKEN invalid' },
    });
  });
});
