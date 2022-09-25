import { FindOrdersWithProductsService } from '@modules/orders/services/FindOrdersWithProductsService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class FindOrdersWithProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { first, offset } = request.query

    const findOrdersWithProductsService = container.resolve(
      FindOrdersWithProductsService
    )

    const orders = await findOrdersWithProductsService.execute({
      first: parseInt(first as string),
      offset: parseInt(offset as string)
    })

    return response.status(200).json({ orders })
  }
}
