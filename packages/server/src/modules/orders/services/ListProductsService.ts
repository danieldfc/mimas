import { inject, injectable } from 'tsyringe'
import { Product } from '../infra/typeorm/entities/Product'
import IProductsRepository from '../infra/typeorm/repositories/IProductsRepository'

@injectable()
export class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute(): Promise<Product[]> {
    return this.productsRepository.findAll()
  }
}
