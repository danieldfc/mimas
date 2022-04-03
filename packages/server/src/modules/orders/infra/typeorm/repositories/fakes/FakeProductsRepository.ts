import ICreateProductDTO from '@modules/orders/dtos/ICreateProductDTO'
import { Product } from '@modules/orders/infra/typeorm/entities/Product'
import { randomUUID } from 'crypto'
import IProductsRepository from '../IProductsRepository'

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = []

  public async create({
    title,
    description,
    price
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product()

    Object.assign(product, {
      id: randomUUID(),
      title,
      description,
      price: `$${price}`
    })

    this.products.push(product)

    return product
  }

  public async findByIds(ids: string[]): Promise<Product[]> {
    return this.products.reduce((acc, product) => {
      if (ids.includes(product.id)) acc.push(product)
      return acc
    }, [] as Product[])
  }

  async save(product: Product): Promise<void> {
    const findIndex = this.products.findIndex(
      findOrder => findOrder.id === product.id
    )

    this.products[findIndex] = product
  }
}
