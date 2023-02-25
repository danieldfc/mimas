import ICreateProductDTO from '@modules/orders/dtos/ICreateProductDTO'
import {
  Product,
  ProductType
} from '@modules/orders/infra/typeorm/entities/Product'
import { v4 as uuidV4 } from 'uuid'
import IProductsRepository from '../IProductsRepository'

export default class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = []

  async create({
    title,
    description,
    price,
    supplier,
    maximumAmount,
    type
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product()

    Object.assign(product, {
      id: uuidV4(),
      title,
      description,
      price: `$${price}`,
      supplier,
      maximumAmount: maximumAmount || 0,
      type: type || ProductType.METERS,
      supplierId: supplier.id
    })

    this.products.push(product)

    return product
  }

  async findAll(): Promise<Product[]> {
    return this.products
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.products.reduce((acc, product) => {
      if (ids.includes(product.id)) acc.push(product)
      return acc
    }, [] as Product[])
  }

  async findById(id: string): Promise<Product | undefined> {
    return this.products.find(p => p.id === id)
  }

  async save(product: Product): Promise<void> {
    const findIndex = this.products.findIndex(
      findOrder => findOrder.id === product.id
    )

    this.products[findIndex] = product
  }

  async destroy(id: string): Promise<void> {
    const findIndex = this.products.findIndex(s => s.id === id)
    if (findIndex > -1) {
      this.products.splice(findIndex, 1)
    }
  }
}
