import { object, string } from 'yup';

const schema = object().shape({
  email: string()
    .email()
    .strict(true)
    .required('Seu email é obrigatório.'),
  password: string()
    .strict(true)
    .required('Sua senha é obrigatória.'),
});

export default schema;
