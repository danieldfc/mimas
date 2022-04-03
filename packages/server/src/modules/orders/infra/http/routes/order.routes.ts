import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { CreateOrderController } from '../controllers/CreateOrderController'

const orderRoute = Router()

const createOrderController = new CreateOrderController()

orderRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      workmanship: Joi.number().required(),
      products: Joi.array()
        .items({
          productId: Joi.string().uuid().required(),
          qtd: Joi.number().required()
        })
        .required()
    }
  }),
  createOrderController.handle
)

export { orderRoute }
