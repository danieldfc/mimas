import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../utils/truncate';

describe('Product delete', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able delete a product', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');

    const product = await factory.create('Product');

    const response = await request(app)
      .delete(`/companies/${company.id}/products/${product.name}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not be able delete a product without company', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .delete('/companies/1/products/name')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: { message: 'Company not found' },
    });
  });

  it('should not be able delete a product without name product', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');

    const response = await request(app)
      .delete(`/companies/${company.id}/products/name`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: { message: 'Product not found' },
    });
  });

  it('should be able register a new product but without authorization token', async () => {
    const response = await request(app).delete('/companies/1/products/name');

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'TOKEN not provided' },
    });
  });

  it('should be able register a new product but with invalid authorization token', async () => {
    const response = await request(app)
      .delete('/companies/1/products/name')
      .set('Authorization', 'Bearer 123');

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      error: { message: 'TOKEN invalid' },
    });
  });
});
