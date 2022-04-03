import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { CreateProductController } from '../controllers/CreateProductController'

const productRoute = Router()

const createProductController = new CreateProductController()

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

export { productRoute }
