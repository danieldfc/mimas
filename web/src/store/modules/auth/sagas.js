import { toast } from 'react-toastify';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';
import AuthTypes from './types';

export function* signIn({ payload: { email, password } }) {
  try {
    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { user, token } = response.data;

    yield put(signInSuccess(user, token));

    history.push('/dashboard/students');
  } catch (err) {
    toast.error('Authentication failure, verify data.');
    yield put(signFailure());
  }
}

export function* signUp({ payload: { name, email, password } }) {
  try {
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    history.push('/');
    toast.success('User created with success.');
  } catch (err) {
    toast.error('Falha ao se cadastrar, verifique seus dados');

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
