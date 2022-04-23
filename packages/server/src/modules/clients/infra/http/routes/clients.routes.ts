import { Router } from 'express'

import { CreateClientController } from '../controllers/CreateClientController'
import { ListClientsController } from '../controllers/ListClientsController'

const clientRoutes = Router()

const createClientController = new CreateClientController()
const listClientController = new ListClientsController()

clientRoutes.post('/', createClientController.handle)
clientRoutes.get('/', listClientController.handle)

export { clientRoutes }
