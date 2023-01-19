import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { RefreshTokenService } from '@modules/users/services/RefreshTokenService'

export class RefreshTokenController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const refreshToken = (request.body.token ||
      request.headers['x-access-token'] ||
      request.query.token) as string
    const refreshTokenService = container.resolve(RefreshTokenService)

    const refreshTokenUpdated = await refreshTokenService.execute({
      refreshToken
    })

    return response.status(200).json({ refreshToken: refreshTokenUpdated })
  }
}
