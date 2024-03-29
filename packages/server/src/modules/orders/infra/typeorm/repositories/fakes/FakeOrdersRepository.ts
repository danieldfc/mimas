import { Client } from '@modules/clients/infra/typeorm/entities/Client'
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO'
import IFindOrdersDTO from '@modules/orders/dtos/IFindOrdersDTO'
import { Order } from '@modules/orders/infra/typeorm/entities/Order'
import { v4 as uuidV4 } from 'uuid'
import IOrdersRepository from '../IOrdersRepository'

export default class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = []

  public async create({
    title,
    description,
    workmanship,
    priceProducts,
    deliveryAt,
    clients,
    metadado
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order()

    Object.assign(order, {
      id: uuidV4(),
      title,
      description,
      finalPrice: workmanship + priceProducts,
      deliveryAt,
      clients,
      metadado,
      workmanship
    })

    this.orders.push(order)

    return order
  }

  public async findById(id: string): Promise<Order | undefined> {
    return this.orders.find(order => order.id === id)
  }

  public associateClient(idOrder: string, client: Client): void {
    const order = this.orders.find(order => order.id === idOrder)

    if (order) {
      order.clients = [...(order.clients ?? []), client]
    }
  }

  public async findAll(options?: IFindOrdersDTO): Promise<Order[]> {
    const offset = options?.offset || 0
    const first = options?.first || 10

    return this.orders.slice(offset, offset + first)
  }

  public async save(order: Order): Promise<void> {
    const findIndex = this.orders.findIndex(
      findOrder => findOrder.id === order.id
    )

    this.orders[findIndex] = order
  }

  public async fetchAllOpenOrdersScheduledForToday(): Promise<Order[]> {
    return this.orders
  }

  public async destroy(order: Order): Promise<void> {
    const findIndex = this.orders.findIndex(o => o.id === order.id)
    if (findIndex >= 0) {
      this.orders.splice(findIndex, 1)
    }
  }
}
