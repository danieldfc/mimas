import { object, string, number } from 'yup';

export default async (req, res, next) => {
  try {
    const schema = object().shape({
      name: string().strict(true),
      price: number()
        .positive()
        .when('name', (name, field) =>
          name ? field.required() : field
        ),
      amount: number()
        .positive()
        .integer(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(403).json({
      error: { message: 'Validation failure' },
    });
  }
};
