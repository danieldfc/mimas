import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import ICreateOrderDTO from '../dtos/ICreateOrderDTO'

import { Order } from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../infra/typeorm/repositories/IOrdersRepository'

@injectable()
export class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({
    description,
    products,
    title,
    workmanship
  }: ICreateOrderDTO): Promise<Order> {
    if (workmanship <= 0) {
      throw new AppError('Não informado preço de mão de obra')
    }

    if (!products.length) {
      throw new AppError('Não informado produtos.')
    }

    const order = await this.ordersRepository.create({
      title,
      description,
      workmanship,
      products
    })

    return order
  }
}
