import { UpdateClientService } from '@modules/clients/services/UpdateClientService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request.params
    const { name, email, phone, address } = request.body

    const updateClient = container.resolve(UpdateClientService)

    const client = await updateClient.execute({
      clientId,
      name,
      email,
      phone,
      address
    })

    return response.status(200).json({ client })
  }
}
