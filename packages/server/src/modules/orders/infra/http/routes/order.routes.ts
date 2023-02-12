import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

import { CreateOrderController } from '../controllers/CreateOrderController'
import { FindOrdersWithProductsController } from '../controllers/FindOrdersWithProductsController'
import { UpdateStatusOrderController } from '../controllers/UpdateStatusOrderController'
import { FindOrderController } from '../controllers/FindOrderController'
import { OrdersTodayController } from '../controllers/OrdersTodayController'

const orderRoute = Router()

const createOrderController = new CreateOrderController()
const findOrdersWithProductsController = new FindOrdersWithProductsController()
const updateStatusOrderController = new UpdateStatusOrderController()
const findOrderController = new FindOrderController()
const ordersTodayController = new OrdersTodayController()

orderRoute.use(ensureAuthenticated)

orderRoute.post(
  '/',
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

orderRoute.get('/', findOrdersWithProductsController.handle)

orderRoute.get('/:id', findOrderController.handle)

orderRoute.patch(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      status: Joi.string().required()
    }
  }),
  updateStatusOrderController.handle
)

orderRoute.get('/notifications/today', ordersTodayController.handle)

export { orderRoute }
