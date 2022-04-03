import { CreateOrderService } from '@modules/orders/services/CreateOrderService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, products, workmanship } = request.body

    const createOrderService = container.resolve(CreateOrderService)

    const order = await createOrderService.execute({
      title,
      description,
      products,
      workmanship
    })

    return response.status(201).json(order)
  }
}
