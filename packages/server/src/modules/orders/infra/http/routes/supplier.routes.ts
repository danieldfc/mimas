import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateSupplierController } from '../controllers/CreateSupplierController'
import { ListSuppliersController } from '../controllers/ListSuppliersController'
import { DeleteSupplierController } from '../controllers/DeleteSupplierController'
import { UpdateSupplierController } from '../controllers/UpdateSupplierController'

const supplierRoute = Router()

const createSupplierController = new CreateSupplierController()
const listSuppliersController = new ListSuppliersController()
const deleteSupplierController = new DeleteSupplierController()
const updateSupplierController = new UpdateSupplierController()

supplierRoute.post(
  '/',
  ensureAuthenticated,
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

supplierRoute.get('/', ensureAuthenticated, listSuppliersController.handle)

supplierRoute.delete(
  '/:id',
  ensureAuthenticated,
  deleteSupplierController.handle
)

supplierRoute.put('/:id', ensureAuthenticated, updateSupplierController.handle)

export { supplierRoute }
