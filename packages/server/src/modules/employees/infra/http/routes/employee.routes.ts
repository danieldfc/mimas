import { Router } from 'express'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import { CreateEmployeeController } from '../controllers/CreateEmployeeController'
import { ListEmployeeController } from '../controllers/ListEmployeeController'
import { ShowEmployeeController } from '../controllers/ShowEmployeeController'
import { UpdateEmployeeController } from '../controllers/UpdateEmployeeController'
import { DeleteEmployeeController } from '../controllers/DeleteEmployeeController'

const employeeRoutes = Router()

const createEmployeeController = new CreateEmployeeController()
const listEmployeeController = new ListEmployeeController()
const showEmployeeController = new ShowEmployeeController()
const updateEmployeeController = new UpdateEmployeeController()
const deleteEmployeeController = new DeleteEmployeeController()

employeeRoutes.use(ensureAuthenticated)

employeeRoutes.get('/', listEmployeeController.handle)
employeeRoutes.get('/:id', showEmployeeController.handle)
employeeRoutes.put('/:id', updateEmployeeController.handle)
employeeRoutes.delete('/:id', deleteEmployeeController.handle)
employeeRoutes.post('/', createEmployeeController.handle)

export { employeeRoutes }
