import Company from '../models/Company';

class CompanyController {
  async store(req, res) {
    const { email } = req.body;

    const checkCompany = await Company.findOne({ where: { email } });

    if (checkCompany) {
      return res
        .status(400)
        .json({ error: { message: 'Company already exist' } });
    }

    const { id, name, phone, address } = await Company.create(req.body);

    return res.json({
      id,
      name,
      email,
      phone,
      address,
    });
  }
}

export default new CompanyController();
