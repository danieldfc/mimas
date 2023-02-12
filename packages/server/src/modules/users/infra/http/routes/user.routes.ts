import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
import { ProfileController } from '../controllers/ProfileController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const userRouter = Router()

const createUserController = new CreateUserController()
const profileController = new ProfileController()

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

userRouter.put(
  '/:id',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string(),
      email: Joi.string().email(),
      nick: Joi.string(),
      oldPassword: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password'))
    }
  }),
  profileController.update
)

export { userRouter }
