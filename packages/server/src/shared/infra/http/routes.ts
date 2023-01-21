import { Router } from 'express'

import { userRouter } from '@modules/users/infra/http/routes/user.routes'
import { sessionsRouter } from '@modules/users/infra/http/routes/sessions.routes'
import { orderRoute } from '@modules/orders/infra/http/routes/order.routes'
import { productRoute } from '@modules/orders/infra/http/routes/product.routes'
import { clientRoutes } from '@modules/clients/infra/http/routes/clients.routes'
import { supplierRoute } from '@modules/orders/infra/http/routes/supplier.routes'
import { passwordRouter } from '@modules/users/infra/http/routes/password.routes'
import { profileRouter } from '@modules/users/infra/http/routes/profile.routes'
import { refreshTokensRouter } from '@modules/users/infra/http/routes/refresh-token.routes'
import { notificationRouter } from '@modules/users/infra/http/routes/notification.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/sessions', sessionsRouter)
routes.use('/notifications', notificationRouter)
routes.use('/refresh-token', refreshTokensRouter)
routes.use('/orders', orderRoute)
routes.use('/products', productRoute)
routes.use('/clients', clientRoutes)
routes.use('/suppliers', supplierRoute)
routes.use('/password', passwordRouter)
routes.use('/profile', profileRouter)

export { routes }
