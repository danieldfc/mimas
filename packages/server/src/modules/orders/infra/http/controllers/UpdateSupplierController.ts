import { UpdateSupplierService } from '@modules/orders/services/UpdateSupplierService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateSupplierController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, phone, address, keyPix, typePix, phoneSecondary } =
      request.body

    const updateSupplierService = container.resolve(UpdateSupplierService)

    const supplierUpdated = await updateSupplierService.execute(id, {
      name,
      email,
      phone,
      address,
      keyPix,
      typePix,
      phoneSecondary
    })

    return response.status(200).json(supplierUpdated)
  }
}
