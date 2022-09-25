import { ListProductsService } from '@modules/orders/services/ListProductsService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listProductsService = container.resolve(ListProductsService)

    const products = await listProductsService.execute()

    return response.json({ products })
  }
}
