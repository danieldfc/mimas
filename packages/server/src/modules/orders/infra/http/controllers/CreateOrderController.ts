import { CreateOrderService } from '@modules/orders/services/CreateOrderService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { title, description, metadado, workmanship, clientsId, deliveryAt } =
      request.body

    const createOrderService = container.resolve(CreateOrderService)

    const order = await createOrderService.execute({
      title,
      description,
      metadado,
      workmanship,
      clientsId,
      deliveryAt: deliveryAt ?? null
    })

    return response.status(201).json({ order })
  }
}
