import { Router } from 'express';

import ClientController from './app/controllers/ClientController';
import CompanyController from './app/controllers/CompanyController';
import ProductController from './app/controllers/ProductController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import authMiddleware from './app/middlewares/auth';

import validationClientStore from './app/validators/Client/Store';
import validationCompanyStore from './app/validators/Company/Store';
import validationProductStore from './app/validators/Product/Store';
import validationProductUpdate from './app/validators/Product/Update';
import validationSessionStore from './app/validators/Session/Store';
import validationUserStore from './app/validators/User/Store';

const routes = Router();

routes.get('/', (req, res) => {
  return res.json({ message: 'Seja bem vindo a DACIA BORDADOS' });
});

routes.post('/users', validationUserStore, UserController.store);
routes.post('/sessions', validationSessionStore, SessionController.store);

routes.use(authMiddleware);

// client
routes.get('/clients', ClientController.index);
routes.post('/clients', validationClientStore, ClientController.store);

// product
routes.get('/companies/:company_id/products', ProductController.index);
routes.post(
  '/companies/:company_id/products',
  validationProductStore,
  ProductController.store
);
routes.delete(
  '/companies/:company_id/products/:name_product',
  ProductController.delete
);
routes.put(
  '/companies/:company_id/products/:name_product',
  validationProductUpdate,
  ProductController.update
);

// company
routes.post('/companies', validationCompanyStore, CompanyController.store);

export default routes;
