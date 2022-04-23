import { CreateProductService } from '@modules/orders/services/CreateProductService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, price } = request.body

    const createProductService = container.resolve(CreateProductService)

    const product = await createProductService.execute({
      title,
      description,
      price
    })

    return response.status(201).json(product)
  }
}