import Company from '../models/Company';
import Product from '../models/Product';

class ProductController {
  async store(req, res) {
    const { company_id } = req.params;
    const { name } = req.body;

    const company = await Company.findByPk(company_id);

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

  async delete(req, res) {
    const { company_id, name } = req.params;

    const company = await Company.findByPk(company_id);

    const product = await Product.findOne({
      where: { name },
    });

    if (!product) {
      return res.status(404).json({ error: { message: 'Product not found' } });
    }

    await company.removeProduct(product);

    await product.destroy();

    return res.json();
  }
}

export default new ProductController();
