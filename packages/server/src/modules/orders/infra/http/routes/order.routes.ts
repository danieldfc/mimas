import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateOrderController } from '../controllers/CreateOrderController'
import { FindOrdersWithProductsController } from '../controllers/FindOrdersWithProductsController'

const orderRoute = Router()

const createOrderController = new CreateOrderController()
const findOrdersWithProductsController = new FindOrdersWithProductsController()

orderRoute.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      workmanship: Joi.number().min(0).required(),
      products: Joi.array()
        .items({
          productId: Joi.string().uuid().required(),
          qtd: Joi.number().required()
        })
        .required(),
      clientId: Joi.string().uuid().required()
    }
  }),
  createOrderController.handle
)

orderRoute.get(
  '/',
  ensureAuthenticated,
  findOrdersWithProductsController.handle
)

export { orderRoute }
