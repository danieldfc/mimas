import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import ICreateProductDTO from '../dtos/ICreateProductDTO'
import { Product } from '../infra/typeorm/entities/Product'
import IProductsRepository from '../infra/typeorm/repositories/IProductsRepository'

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    description,
    price,
    title
  }: ICreateProductDTO): Promise<Product> {
    if (price <= 0) {
      throw new AppError('Não informado preço do produto.')
    }

    const product = await this.productsRepository.create({
      title,
      description,
      price
    })

    return product
  }
}
