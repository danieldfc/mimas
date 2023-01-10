import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateProductController } from '../controllers/CreateProductController'
import { ListProductsController } from '../controllers/ListProductsController'
import { DeleteProductController } from '../controllers/DeleteProductController'
import { UpdateProductController } from '../controllers/UpdateProductController'

const productRoute = Router()

const createProductController = new CreateProductController()
const listProductsController = new ListProductsController()
const deleteProductController = new DeleteProductController()
const updateProductController = new UpdateProductController()

productRoute.use(ensureAuthenticated)

productRoute.post(
  '/',
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

productRoute.get('/', listProductsController.handle)

productRoute.put('/:productId', updateProductController.handle)

productRoute.delete(
  '/:productId/suppliers/:supplierId',
  deleteProductController.handle
)

export { productRoute }
