import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO'
import IFindOrdersDTO from '@modules/orders/dtos/IFindOrdersDTO'
import { FindOneOptions } from 'typeorm'

import { Order } from '../entities/Order'

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>
  findById(
    id: string,
    options?: FindOneOptions<Order>
  ): Promise<Order | undefined>
  findAll(options?: IFindOrdersDTO): Promise<Order[]>
  save(order: Order): Promise<void>
}
