import { DeleteProductService } from '@modules/orders/services/DeleteProductService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DeleteProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { supplierId, productId } = request.params

    const deleteProductService = container.resolve(DeleteProductService)

    await deleteProductService.execute({
      supplierId,
      productId
    })

    return response.status(204).send()
  }
}
