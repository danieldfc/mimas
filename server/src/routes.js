import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import validationSessionStore from './app/validators/Session/Store';
import validationUserStore from './app/validators/User/Store';

const routes = Router();

routes.post('/users', validationUserStore, UserController.store);
routes.post('/sessions', validationSessionStore, SessionController.store);

export default routes;
