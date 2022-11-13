import { ListSuppliersService } from '@modules/orders/services/ListSuppliersService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListSuppliersController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const listSupplierService = container.resolve(ListSuppliersService)

    const suppliers = await listSupplierService.execute()

    return response.status(200).json({ suppliers })
  }
}
