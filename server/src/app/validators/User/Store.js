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
      password: string()
        .strict(true)
        .min(6)
        .required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(403).json({
      error: {
        title: 'Validation failure',
        message: err.inner.map(mes => mes.message),
      },
    });
  }
};
