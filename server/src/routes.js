import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import CompanyController from './app/controllers/CompanyController';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

import { validatorClientStore } from './app/validators/client';
import { validatorCompanyStore } from './app/validators/company';
import {
  validatorProductStore,
  validatorProductUpdate,
} from './app/validators/product';
import { validatorSessionStore } from './app/validators/session';
import { validatorUserStore } from './app/validators/user';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Seja bem vindo a DACIA BORDADOS' });
});

routes.post('/users', validatorUserStore, UserController.store);
routes.post('/sessions', validatorSessionStore, SessionController.store);

routes.use(authMiddleware);

// client
routes.get('/clients', ClientController.index);
routes.post('/clients', validatorClientStore, ClientController.store);

// product
routes.get('/companies/:company_id/products', ProductController.index);
routes.post(
  '/companies/:company_id/products',
  validatorProductStore,
  ProductController.store
);
routes.delete(
  '/companies/:company_id/products/:name_product',
  ProductController.delete
);
routes.put(
  '/companies/:company_id/products/:name_product',
  validatorProductUpdate,
  ProductController.update
);

// company
routes.post('/companies', validatorCompanyStore, CompanyController.store);

export default routes;
