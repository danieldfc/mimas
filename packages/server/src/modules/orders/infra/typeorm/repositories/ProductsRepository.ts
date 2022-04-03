import ICreateProductDTO from '@modules/orders/dtos/ICreateProductDTO'
import { getRepository, Repository } from 'typeorm'
import { Product } from '../entities/Product'
import IProductsRepository from './IProductsRepository'

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>

  constructor() {
    this.ormRepository = getRepository(Product)
  }

  public async create({
    title,
    description,
    price
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      title,
      description,
      price: price.toString()
    })

    await this.save(product)

    return product
  }

  public findByIds(id: string[]): Promise<Product[]> {
    return this.ormRepository.findByIds(id)
  }

  async save(product: Product): Promise<void> {
    await this.ormRepository.save(product)
  }
}
