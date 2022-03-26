import { Request, Response } from 'express'
import { CreateUserService } from '../services/CreateUserService'

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, nick, email, password } = request.body
    const createUserService = new CreateUserService()

    const user = await createUserService.execute({
      name,
      nick,
      email,
      password
    })

    // @ts-ignore
    delete user.password

    return response.status(201).json(user)
  }
}
