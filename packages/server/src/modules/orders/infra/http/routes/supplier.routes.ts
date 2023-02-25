import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateSupplierController } from '../controllers/CreateSupplierController'
import { ListSuppliersController } from '../controllers/ListSuppliersController'
import { DeleteSupplierController } from '../controllers/DeleteSupplierController'
import { UpdateSupplierController } from '../controllers/UpdateSupplierController'
import { ShowSupplierController } from '../controllers/ShowSupplierController'

const supplierRoute = Router()

const createSupplierController = new CreateSupplierController()
const listSuppliersController = new ListSuppliersController()
const deleteSupplierController = new DeleteSupplierController()
const updateSupplierController = new UpdateSupplierController()
const showSupplierController = new ShowSupplierController()

supplierRoute.use(ensureAuthenticated)

supplierRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().min(1).max(25),
      address: Joi.string().allow('').max(255)
    }
  }),
  createSupplierController.handle
)

supplierRoute.get('/', listSuppliersController.handle)
supplierRoute.get('/:id', showSupplierController.handle)

supplierRoute.delete('/:id', deleteSupplierController.handle)

supplierRoute.put('/:id', updateSupplierController.handle)

export { supplierRoute }
