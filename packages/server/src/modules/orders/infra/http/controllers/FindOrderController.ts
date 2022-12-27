import { ShowOrderWithProductsService } from '@modules/orders/services/ShowOrderWithProductsService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class FindOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const showOrderWithProductsService = container.resolve(
      ShowOrderWithProductsService
    )

    const order = await showOrderWithProductsService.execute({
      idOrder: id
    })

    return response.status(200).json({ order })
  }
}
