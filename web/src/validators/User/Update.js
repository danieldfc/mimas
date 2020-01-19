import { object, string, ref } from 'yup';

const schema = object().shape({
  name: string().strict(true),
  email: string()
    .email()
    .strict(true),
  oldPassword: string()
    .min(6)
    .strict(true),
  password: string()
    .strict(true)
    .min(6)
    .when('oldPassword', (oldPassword, field) =>
      oldPassword ? field.required() : field
    ),
  confirmPassword: string()
    .strict(true)
    .when('password', (password, field) =>
      password ? field.required().oneOf([ref('password')]) : field
    ),
});

export default schema;
