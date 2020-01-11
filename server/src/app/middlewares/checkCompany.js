import Company from '../models/Company';

export default async (req, res, next) => {
  const { company_id } = req.params;

  const checkCompany = await Company.findByPk(company_id);

  if (!checkCompany) {
    return res.status(404).json({ error: { message: 'Company not found' } });
  }

  return next();
};
