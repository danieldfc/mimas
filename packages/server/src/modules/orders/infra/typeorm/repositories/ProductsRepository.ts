import ICreateProductDTO from '@modules/orders/dtos/ICreateProductDTO'
import { Repository, getRepository } from 'typeorm'
import { Product } from '../entities/Product'
import IProductsRepository from './IProductsRepository'

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>

  constructor() {
    this.ormRepository = getRepository(Product)
  }

  async create({
    title,
    description,
    price,
    supplier
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      title,
      description,
      price: price.toString(),
      supplier
    })

    await this.save(product)

    return product
  }

  findByIds(id: string[]): Promise<Product[]> {
    return this.ormRepository.findByIds(id)
  }

  findById(id: string): Promise<Product | undefined> {
    return this.ormRepository.findOne({
      where: { id }
    })
  }

  findAll(): Promise<Product[]> {
    return this.ormRepository.find()
  }

  async save(product: Product): Promise<void> {
    await this.ormRepository.save(product)
  }

  async destroy(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
