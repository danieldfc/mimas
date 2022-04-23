import { CreateClientService } from '@modules/clients/services/CreateClientService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, phone, address, email } = request.body

    const createClientService = container.resolve(CreateClientService)

    const client = await createClientService.execute({
      name,
      phone,
      address,
      email
    })

    return response.status(201).json({ client })
  }
}
