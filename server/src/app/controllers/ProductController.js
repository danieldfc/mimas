import { Op } from 'sequelize';

import Company from '../models/Company';
import Product from '../models/Product';

class ProductController {
  async index(req, res) {
    const { name = '', page = 1 } = req.query;

    const products = await Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
      attributes: ['id', 'name', 'price', 'amount'],
      limit: 20,
      offset: (page - 1) * 20,
      order: [['name', 'asc']],
      include: {
        association: 'companies',
        attributes: ['id', 'name', 'email', 'phone', 'address'],
        through: { attributes: [] },
      },
    });

    return res.json(products);
  }

  async store(req, res) {
    const { company_id } = req.params;
    const { name } = req.body;

    const company = await Company.findByPk(company_id);

    if (!company) {
      return res.status(404).json({ error: { message: 'Company not found' } });
    }

    const checkProduct = await Product.findOne({ where: { name } });

    if (checkProduct) {
      return res
        .status(400)
        .json({ error: { message: 'Product already exist' } });
    }

    const product = await Product.create(req.body);

    await company.addProduct(product);

    const { id, price, amount } = product;

    return res.json({
      id,
      name,
      price,
      amount,
    });
  }

  async update(req, res) {
    const { company_id, name_product } = req.params;
    const { name } = req.body;

    const company = await Company.findByPk(company_id);

    if (!company) {
      return res.status(404).json({ error: { message: 'Company not found' } });
    }

    const product = await Product.findOne({ where: { name: name_product } });

    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }

    if (name && name !== product.name) {
      const checkProduct = await Product.findOne({
        where: { name },
      });

      if (checkProduct) {
        return res
          .status(400)
          .json({ error: { message: 'Product already exist' } });
      }
    }

    const { id, price, amount } = await product.update(req.body);

    return res.json({
      id,
      name,
      price,
      amount,
    });
  }

  async delete(req, res) {
    const { company_id, name_product } = req.params;

    const company = await Company.findByPk(company_id);

    if (!company) {
      return res.status(404).json({ error: { message: 'Company not found' } });
    }

    const product = await Product.findOne({
      where: { name: name_product },
    });

    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }

    await company.removeProduct(product);

    return res.json();
  }
}

export default new ProductController();
