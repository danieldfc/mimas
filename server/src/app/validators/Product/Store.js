import { object, string, number } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string()
        .strict(true)
        .required(),
      price: number()
        .positive()
        .required(),
      amount: number()
        .positive()
        .integer()
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(403).json({
      error: { message: 'Validation failure' },
    });
  }
};
