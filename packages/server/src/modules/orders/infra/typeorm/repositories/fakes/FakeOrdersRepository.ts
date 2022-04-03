import ICreateOrderDTO, {
  ICreateOrderInProduct
} from '@modules/orders/dtos/ICreateOrderDTO'
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
    products
  }: ICreateOrderDTO): Promise<Order> {
    const productsVerified = await this.getProducts(products)
    const priceProducts = this.getPriceTotalProduct(productsVerified)

    const order = new Order()

    Object.assign(order, {
      id: randomUUID(),
      title,
      description,
      finalPrice: workmanship + priceProducts,
      postToProducts: productsVerified
    })

    this.orders.push(order)

    return order
  }

  private async getProducts(
    products: ICreateOrderInProduct[]
  ): Promise<Product[]> {
    const idsProducts = products.map(product => product.productId)
    return this.products.reduce((acc, prod) => {
      if (idsProducts.includes(prod.id)) acc.push(prod)
      return acc
    }, [] as Product[])
  }

  private getPriceTotalProduct(products: Product[]): number {
    return products.reduce((acc, product) => acc + product.price, 0)
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
