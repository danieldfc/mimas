import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { CreateUserController } from '../controllers/CreateUserController'
import { UpdateProfileController } from '../controllers/UpdateProfileController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRouter = Router()

const createUserController = new CreateUserController()
const updateProfileController = new UpdateProfileController()

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
      nick: Joi.string()
    }
  }),
  updateProfileController.handle
)

export { userRouter }
