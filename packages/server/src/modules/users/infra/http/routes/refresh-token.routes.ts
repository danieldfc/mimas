import { Router } from 'express'

import { RefreshTokenController } from '../controllers/RefreshTokenController'

const refreshTokensRouter = Router()

const refreshTokenController = new RefreshTokenController()

refreshTokensRouter.post('/', refreshTokenController.handle)

export { refreshTokensRouter }
