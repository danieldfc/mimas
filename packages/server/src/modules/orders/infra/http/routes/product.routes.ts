import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateProductController } from '../controllers/CreateProductController'
import { ListProductsController } from '../controllers/ListProductsController'
import { DeleteProductController } from '../controllers/DeleteProductController'

const productRoute = Router()

const createProductController = new CreateProductController()
const listProductsController = new ListProductsController()
const deleteProductController = new DeleteProductController()

productRoute.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(0).required(),
      supplierId: Joi.string().uuid().required()
    }
  }),
  createProductController.handle
)

productRoute.get('/', ensureAuthenticated, listProductsController.handle)

productRoute.delete(
  '/:productId/suppliers/:supplierId',
  ensureAuthenticated,
  deleteProductController.handle
)

export { productRoute }
