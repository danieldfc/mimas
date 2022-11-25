import { UpdateStatusOrderService } from '@modules/orders/services/UpdateStatusOrderService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { StatusOrder } from '../../typeorm/entities/Order'

export class UpdateStatusOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { status } = request.body

    const updateStatusOrderService = container.resolve(UpdateStatusOrderService)

    const order = await updateStatusOrderService.execute({
      status: status as StatusOrder,
      orderId: id
    })

    return response.status(201).json(order)
  }
}
