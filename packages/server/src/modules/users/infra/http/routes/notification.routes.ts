import { Router } from 'express'
import { NotificationsController } from '../controllers/NotificationsController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const notificationRouter = Router()

const notificationsController = new NotificationsController()

notificationRouter.use(ensureAuthenticated)

notificationRouter.get('/', notificationsController.list)

notificationRouter.patch('/:id', notificationsController.read)

export { notificationRouter }
