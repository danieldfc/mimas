import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ShowSupplierService } from '@modules/orders/services/ShowSupplierService'

export class ShowSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showSupplier = container.resolve(ShowSupplierService)

    const supplier = await showSupplier.execute({ id })

    return response.status(200).json({ supplier })
  }
}
