import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'

import { UpdateProfileService } from '@modules/users/services/UpdateProfileService'

export class UpdateProfileController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.params
    const { name, nick, email } = request.body

    const updateProfileService = container.resolve(UpdateProfileService)

    const profileUpdated = await updateProfileService.execute({
      userId,
      email,
      name,
      nick
    })

    return response.json({ user: instanceToPlain(profileUpdated) })
  }
}
