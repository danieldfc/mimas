import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import { UpdateProfileService } from '@modules/users/services/UpdateProfileService'
import { ShowProfileService } from '@modules/users/services/ShowProfileService'

export class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id

    const showProfile = container.resolve(ShowProfileService)

    const profileUpdated = await showProfile.execute({
      userId
    })

    return response.json({ user: instanceToPlain(profileUpdated) })
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id
    const { name, nick, email, oldPassword, password } = request.body

    const updateProfileService = container.resolve(UpdateProfileService)

    const profileUpdated = await updateProfileService.execute({
      userId,
      email,
      name,
      nick,
      oldPassword,
      password
    })

    return response.json({ user: instanceToPlain(profileUpdated) })
  }
}
