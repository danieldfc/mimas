import { inject, injectable } from 'tsyringe'
import IFindOrdersDTO from '../dtos/IFindOrdersDTO'
import { Order } from '../infra/typeorm/entities/Order'
import IOrdersRepository from '../infra/typeorm/repositories/IOrdersRepository'

@injectable()
export class FindOrdersWithProductsService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({ first = 10, offset = 0 }: IFindOrdersDTO): Promise<Order[]> {
    return this.ordersRepository.findAll({
      first,
      offset
    })
  }
}
