import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { ProfileController } from '../controllers/ProfileController'

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const profileRouter = Router()

const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.put(
  '/',
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

profileRouter.get('/', profileController.show)

export { profileRouter }
