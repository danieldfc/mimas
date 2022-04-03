import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO'

import { Order } from '../entities/Order'

export default interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>
  findById(id: string): Promise<Order | undefined>
  save(order: Order): Promise<void>
}
