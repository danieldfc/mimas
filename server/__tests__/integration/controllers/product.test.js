import request from 'supertest';

import app from '../../../src/app';
import factory from '../../factories';
import truncate from '../../util/truncate';

describe('Product Index', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able list with all products', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.create('Product');

    const response = await request(app)
      .get(`/companies/${company.id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        name: '',
      });

    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(product.id);
  });

  it('should be able list with all products informed without name', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.create('Product');

    const response = await request(app)
      .get(`/companies/${company.id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(product.id);
  });

  it('should be able list with a return of products', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.create('Product');

    const response = await request(app)
      .get(`/companies/${company.id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        name: `${product.name}`,
      });

    expect(response.status).toBe(200);
    expect(response.body[0].id).toBe(product.id);
  });
});

describe('Product store', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able register a new product', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.attrs('Product');

    const response = await request(app)
      .post(`/companies/${company.id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(product);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able register a new product without company', async () => {
    const user = await factory.create('User');
    const product = await factory.attrs('Product');

    const response = await request(app)
      .post('/companies/1/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(product);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Company not found'),
      }),
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
      error: expect.objectContaining({
        message: expect.stringContaining('Product already exist'),
      }),
    });
  });

  it('should not be able register a new product without fields', async () => {
    const user = await factory.create('User');
    const company = await factory.attrs('Company');

    const {
      body: { id },
    } = await request(app)
      .post('/companies')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(company);

    const response = await request(app)
      .post(`/companies/${id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Validation failure'),
      }),
    });
  });
});

describe('Product Update', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able update product', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.create('Product');
    const productUpdate = await factory.attrs('Product');

    const response = await request(app)
      .put(`/companies/${company.id}/products/${product.name}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(productUpdate);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able update product without company', async () => {
    const user = await factory.create('User');
    const productUpdate = await factory.attrs('Product');

    const response = await request(app)
      .put('/companies/1/products/name')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(productUpdate);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Company not found'),
      }),
    });
  });

  it('should not be able update without product', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const productUpdate = await factory.attrs('Product');

    const response = await request(app)
      .put(`/companies/${company.id}/products/name`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(productUpdate);

    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Product not found'),
      }),
    });
  });

  it('should not be able update product with name different', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.create('Product', {
      name: 'name product 1',
    });
    const productUpdate = await factory.attrs('Product', {
      name: 'name product 2',
    });

    const response = await request(app)
      .put(`/companies/${company.id}/products/${product.name}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(productUpdate);

    expect(response.status).toBe(200);
  });

  it('should not be able update product with product already exists', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const productOne = await factory.create('Product', {
      name: 'name product 1',
    });
    const productTwo = await factory.create('Product', {
      name: 'name product 2',
    });
    const productUpdate = await factory.attrs('Product', {
      name: productTwo.name,
    });

    const response = await request(app)
      .put(`/companies/${company.id}/products/${productOne.name}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(productUpdate);

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Product already exist'),
      }),
    });
  });

  it('should not be able update product with error validation', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.create('Product');

    const response = await request(app)
      .put(`/companies/${company.id}/products/${product.name}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'test',
      });

    expect(response.status).toBe(403);
    expect(response.body).toMatchObject({
      error: expect.objectContaining({
        message: expect.stringContaining('Validation failure'),
      }),
    });
  });

  it('should be able update product same without fields', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.create('Product');

    const response = await request(app)
      .put(`/companies/${company.id}/products/${product.name}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
});

describe('Product Delete', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able delete a product', async () => {
    const user = await factory.create('User');
    const company = await factory.create('Company');
    const product = await factory.attrs('Product');

    await request(app)
      .post(`/companies/${company.id}/products`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send(product);

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
      error: expect.objectContaining({
        message: expect.stringContaining('Company not found'),
      }),
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
      error: expect.objectContaining({
        message: expect.stringContaining('Product not found'),
      }),
    });
  });
});
