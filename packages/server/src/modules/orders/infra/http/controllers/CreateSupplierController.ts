import { CreateSupplierService } from '@modules/orders/services/CreateSupplierService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, address } = request.body

    const createSupplierService = container.resolve(CreateSupplierService)

    const supplier = await createSupplierService.execute({
      name,
      email,
      phone,
      address
    })

    return response.status(201).json(supplier)
  }
}
