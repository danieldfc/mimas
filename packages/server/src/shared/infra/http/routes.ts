import { Router } from 'express'

import { userRouter } from '@modules/users/infra/http/routes/user.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'
import { orderRoute } from '@modules/orders/infra/http/routes/order.routes'
import { productRoute } from '@modules/orders/infra/http/routes/product.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/orders', orderRoute)
routes.use('/products', productRoute)

export { routes }
