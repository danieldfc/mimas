import { object, string } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string()
        .strict(true)
        .required(),
      email: string()
        .strict(true)
        .email()
        .required(),
      phone: string()
        .strict(true)
        .min(9)
        .required(),
      address: string()
        .strict(true)
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
