import { DeleteClientService } from '@modules/clients/services/DeleteClientService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { clientId } = request.params

    const deleteClient = container.resolve(DeleteClientService)

    await deleteClient.execute({ clientId })

    return response.status(204).send()
  }
}
