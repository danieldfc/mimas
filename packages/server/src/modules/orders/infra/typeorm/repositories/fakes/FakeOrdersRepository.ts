import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO'
import { Order } from '@modules/orders/infra/typeorm/entities/Order'
import { Product } from '@modules/orders/infra/typeorm/entities/Product'
import { randomUUID } from 'crypto'
import IOrdersRepository from '../IOrdersRepository'

export default class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = []

  private products: Product[] = []

  public async create({
    title,
    description,
    workmanship,
    priceProducts
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order()

    Object.assign(order, {
      id: randomUUID(),
      title,
      description,
      finalPrice: workmanship + priceProducts
    })

    this.orders.push(order)

    return order
  }

  public async findById(id: string): Promise<Order | undefined> {
    return this.orders.find(order => order.id === id)
  }

  public async save(order: Order): Promise<void> {
    const findIndex = this.orders.findIndex(
      findOrder => findOrder.id === order.id
    )

    this.orders[findIndex] = order
  }
}
