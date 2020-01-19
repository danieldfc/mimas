import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Form, Input } from '@rocketseat/unform';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import schema from '~/validators/User/Update';

import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.profile);

  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit} schema={schema}>
        <Input name="name" placeholder="Full name" />
        <Input type="email" name="email" placeholder="Your address of e-mail" />

        <hr />

        <Input
          type="password"
          name="oldPassword"
          placeholder="Your password old"
        />
        <Input type="password" name="password" placeholder="New password" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
        />

        <button type="submit">Atualizar profile</button>
      </Form>

      <button type="button" onClick={handleSignOut}>
        Sair do Sistema
      </button>
    </Container>
  );
}
