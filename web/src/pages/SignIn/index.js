import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

import { Container } from './styles';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  function handleSubmit({ email: user_email, password: user_password }) {
    dispatch(signInRequest(user_email, user_password));
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <img src={logo} alt="Logo" />
        <Input
          name="email"
          type="email"
          label="E-mail"
          placeholder="Digite teu email"
          autoFocus
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
          disabled={email.length === 0 || password.length <= 3}
        >
          ENTRAR
        </button>
        <div>
          Não possui conta?
          <Link to="/register">Registre-se</Link>
        </div>
      </Form>
    </Container>
  );
}
