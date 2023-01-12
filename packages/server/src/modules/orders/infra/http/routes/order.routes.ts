import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateOrderController } from '../controllers/CreateOrderController'
import { FindOrdersWithProductsController } from '../controllers/FindOrdersWithProductsController'
import { UpdateStatusOrderController } from '../controllers/UpdateStatusOrderController'
import { FindOrderController } from '../controllers/FindOrderController'

const orderRoute = Router()

const createOrderController = new CreateOrderController()
const findOrdersWithProductsController = new FindOrdersWithProductsController()
const updateStatusOrderController = new UpdateStatusOrderController()
const findOrderController = new FindOrderController()

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
      clientsId: Joi.array().items(Joi.string().uuid().required()).required(),
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

orderRoute.get('/:id', ensureAuthenticated, findOrderController.handle)

orderRoute.patch(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required()
    }
  }),
  updateStatusOrderController.handle
)

export { orderRoute }
