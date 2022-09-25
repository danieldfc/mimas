import ICreateProductDTO from '@modules/orders/dtos/ICreateProductDTO'
import { Product } from '@modules/orders/infra/typeorm/entities/Product'
import { v4 as uuidV4 } from 'uuid'
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
      id: uuidV4(),
      title,
      description,
      price: `$${price}`
    })

    this.products.push(product)

    return product
  }

  public async findAll(): Promise<Product[]> {
    return this.products
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
