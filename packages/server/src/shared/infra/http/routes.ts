import { Router } from 'express'

import { userRouter } from '@modules/users/infra/http/routes/user.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'
import { orderRoute } from '@modules/orders/infra/http/routes/order.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/orders', orderRoute)

export { routes }
