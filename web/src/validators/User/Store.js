import { object, string } from 'yup';

const schema = object().shape({
  name: string()
    .strict(true)
    .required('Seu nome é obrigatório.'),
  email: string()
    .email()
    .strict(true)
    .required('Seu email é obrigatório.'),
  password: string()
    .strict(true)
    .min(6, 'Sua senha precisa ter no mínimo 6 caracteres.')
    .required('Sua senha é obrigatória.'),
});

export default schema;
