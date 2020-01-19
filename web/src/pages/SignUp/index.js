import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import { signUpRequest } from '~/store/modules/auth/actions';

import schema from '~/validators/User/Store';

import { Container } from './styles';

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function handleSubmit({
    name: user_name,
    email: user_email,
    password: user_password,
  }) {
    dispatch(signUpRequest(user_name, user_email, user_password));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema}>
        <h1>CADASTRO</h1>
        <Input
          name="name"
          label="Nome completo"
          placeholder="Informe seu nome completo"
          autoFocus
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Input
          name="email"
          type="email"
          label="E-mail"
          placeholder="Digite seu email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Input
          name="password"
          type="password"
          label="Senha secreta"
          placeholder="Digite sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={
            name.length === 0 || email.length === 0 || password.length <= 3
          }
        >
          CRIAR CONTA
        </button>
        <div>
          Já possui conta?
          <Link to="/">Clique aqui!</Link>
        </div>
      </Form>
    </Container>
  );
}
