import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { CreateUserController } from '../controllers/CreateUserController'

const userRouter = Router()

const createUserController = new CreateUserController()

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      nick: Joi.string().required()
    }
  }),
  createUserController.handle
)

export { userRouter }
