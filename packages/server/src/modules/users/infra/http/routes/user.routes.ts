import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'

const userRouter = Router()

const createUserController = new CreateUserController()

userRouter.post('/', createUserController.handle)

export { userRouter }
