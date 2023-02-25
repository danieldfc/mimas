import { UpdateProductService } from '@modules/orders/services/UpdateProductService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { productId } = request.params
    const { title, description, price, maximumAmount, type, supplierId } =
      request.body
    const updateProduct = container.resolve(UpdateProductService)

    const product = await updateProduct.execute({
      productId,
      title,
      description,
      price,
      supplierId,
      maximumAmount,
      type
    })

    return response.status(200).json({ product })
  }
}
