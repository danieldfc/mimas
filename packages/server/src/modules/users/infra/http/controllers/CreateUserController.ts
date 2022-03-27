import { container } from 'tsyringe'
import { instanceToPlain } from 'class-transformer'
import { Request, Response } from 'express'
import { CreateUserService } from '@modules/users/services/CreateUserService'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, nick, email, password } = request.body

    const createUserService = container.resolve(CreateUserService)

    const user = await createUserService.execute({
      name,
      nick,
      email,
      password
    })

    return response.status(201).json(instanceToPlain(user))
  }
}
