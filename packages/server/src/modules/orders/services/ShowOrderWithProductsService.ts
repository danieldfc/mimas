import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Order } from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../infra/typeorm/repositories/IOrdersRepository'

type IRequestDTO = {
  idOrder: string
}

@injectable()
export class ShowOrderWithProductsService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ idOrder }: IRequestDTO): Promise<Order> {
    const order = await this.ordersRepository.findById(idOrder)

    if (!order) {
      throw new AppError('Order not found.')
    }

    return order
  }
}
