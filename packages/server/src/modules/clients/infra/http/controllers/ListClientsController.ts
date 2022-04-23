import { ListClientsService } from '@modules/clients/services/ListClientsService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const createClientService = container.resolve(ListClientsService)

    const clients = await createClientService.execute()

    return response.json({ clients })
  }
}
