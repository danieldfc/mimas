import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateClientController } from '../controllers/CreateClientController'
import { ListClientsController } from '../controllers/ListClientsController'
import { UpdateClientController } from '../controllers/UpdateClientController'
import { DeleteClientController } from '../controllers/DeleteClientController'

const clientRoutes = Router()

const createClientController = new CreateClientController()
const listClientController = new ListClientsController()
const updateClientController = new UpdateClientController()
const deleteClientController = new DeleteClientController()

clientRoutes.use(ensureAuthenticated)

clientRoutes.post('/', createClientController.handle)
clientRoutes.get('/', listClientController.handle)
clientRoutes.put('/:clientId', updateClientController.handle)
clientRoutes.delete('/:clientId', deleteClientController.handle)

export { clientRoutes }
