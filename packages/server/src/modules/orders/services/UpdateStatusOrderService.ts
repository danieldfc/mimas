import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Order, StatusOrder } from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../infra/typeorm/repositories/IOrdersRepository'

type IRequest = {
  orderId: string
  status: StatusOrder
}

@injectable()
export class UpdateStatusOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ orderId, status }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(orderId)

    if (!order) {
      throw new AppError('Order not found')
    }

    Object.assign(order, { status })

    await this.ordersRepository.save(order)

    return order
  }
}
