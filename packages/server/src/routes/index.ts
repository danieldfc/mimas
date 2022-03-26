import { Router } from 'express'
import { userRouter } from '@modules/users/user.routes'

const routes = Router()

routes.use('/users', userRouter)

export { routes }
