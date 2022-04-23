import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO'
import IFindOrdersDTO from '@modules/orders/dtos/IFindOrdersDTO'
import { Order } from '@modules/orders/infra/typeorm/entities/Order'
import { randomUUID } from 'crypto'
import { Product } from '../../entities/Product'
import { ProductOrder } from '../../entities/ProductOrder'
import IOrdersRepository from '../IOrdersRepository'

export default class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = []

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

  public associateProduct(
    idOrder: string,
    product: Product,
    qtdProduct: number
  ): void {
    const order = this.orders.find(order => order.id === idOrder)

    if (order) {
      const orderProduct = new ProductOrder()
      Object.assign(orderProduct, {
        id: randomUUID(),
        order,
        product,
        qtdProduct
      })
      order.orderProducts = [orderProduct]
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
}
