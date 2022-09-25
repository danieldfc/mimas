import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { CreateProductController } from '../controllers/CreateProductController'
import { ListProductsController } from '../controllers/ListProductsController'

const productRoute = Router()

const createProductController = new CreateProductController()
const listProductsController = new ListProductsController()

productRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().min(0).required()
    }
  }),
  createProductController.handle
)

productRoute.get('/', listProductsController.handle)

export { productRoute }
