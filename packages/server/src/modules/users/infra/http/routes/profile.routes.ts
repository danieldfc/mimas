import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { ProfileController } from '../controllers/ProfileController'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

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
      password: Joi.string()
    }
  }),
  profileController.update
)

profileRouter.get('/', profileController.show)

export { profileRouter }
