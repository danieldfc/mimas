import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { OrdersTodayService } from '@modules/orders/services/OrdersTodayService'

export class OrdersTodayController {
  async handle(_request: Request, response: Response): Promise<Response> {
    const ordersTodayService = container.resolve(OrdersTodayService)

    await ordersTodayService.execute()

    return response.status(204).send()
  }
}
