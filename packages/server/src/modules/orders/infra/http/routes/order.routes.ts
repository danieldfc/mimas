import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateOrderController } from '../controllers/CreateOrderController'
import { FindOrdersWithProductsController } from '../controllers/FindOrdersWithProductsController'
import { UpdateStatusOrderController } from '../controllers/UpdateStatusOrderController'

const orderRoute = Router()

const createOrderController = new CreateOrderController()
const findOrdersWithProductsController = new FindOrdersWithProductsController()
const updateStatusOrderController = new UpdateStatusOrderController()

orderRoute.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      workmanship: Joi.number().min(0).required(),
      metadado: Joi.array()
        .items({
          productId: Joi.string().uuid().required(),
          qtd: Joi.number().required()
        })
        .required(),
      clientId: Joi.string().uuid().required(),
      deliveryAt: Joi.date().default(null)
    }
  }),
  createOrderController.handle
)

orderRoute.get(
  '/',
  ensureAuthenticated,
  findOrdersWithProductsController.handle
)

orderRoute.patch(
  '/:id',
  ensureAuthenticated,
  updateStatusOrderController.handle
)

export { orderRoute }
