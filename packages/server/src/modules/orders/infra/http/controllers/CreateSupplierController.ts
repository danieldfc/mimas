import { CreateSupplierService } from '@modules/orders/services/CreateSupplierService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { address, email, name, phone, keyPix, phoneSecondary, typePix } =
      request.body

    const createSupplierService = container.resolve(CreateSupplierService)

    const supplier = await createSupplierService.execute({
      address,
      email,
      name,
      phone,
      keyPix,
      phoneSecondary,
      typePix
    })

    return response.status(201).json(supplier)
  }
}
