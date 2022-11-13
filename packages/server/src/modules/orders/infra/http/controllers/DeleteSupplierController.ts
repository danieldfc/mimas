import { DeleteSupplierService } from '@modules/orders/services/DeleteSupplierService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DeleteSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteSupplierService = container.resolve(DeleteSupplierService)

    await deleteSupplierService.execute(id)

    return response.status(204).send()
  }
}
