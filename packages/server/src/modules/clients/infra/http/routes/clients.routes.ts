import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateClientController } from '../controllers/CreateClientController'
import { ListClientsController } from '../controllers/ListClientsController'

const clientRoutes = Router()

const createClientController = new CreateClientController()
const listClientController = new ListClientsController()

clientRoutes.post('/', ensureAuthenticated, createClientController.handle)
clientRoutes.get('/', ensureAuthenticated, listClientController.handle)

export { clientRoutes }
