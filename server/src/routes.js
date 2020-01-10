import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

import validationClientStore from './app/validators/Client/Store';
import validationSessionStore from './app/validators/Session/Store';
import validationUserStore from './app/validators/User/Store';

const routes = Router();

routes.post('/users', validationUserStore, UserController.store);
routes.post('/sessions', validationSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.post('/clients', validationClientStore, ClientController.store);

export default routes;
