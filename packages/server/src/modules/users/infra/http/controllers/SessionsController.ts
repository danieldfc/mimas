import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import { AuthenticateUserService } from '@modules/users/services/AuthenticateUserService'

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const authenticateUser = container.resolve(AuthenticateUserService)

    const { user, token, refreshToken } = await authenticateUser.execute({
      email,
      password
    })

    return response.json({ user: instanceToPlain(user), token, refreshToken })
  }
}
