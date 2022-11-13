import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Product } from '../infra/typeorm/entities/Product'
import IProductsRepository from '../infra/typeorm/repositories/IProductsRepository'
import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'

interface IRequestDTO {
  title: string
  description: string
  price: number
  supplierId: string
}

@injectable()
export class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository
  ) {}

  async execute({
    description,
    price,
    title,
    supplierId
  }: IRequestDTO): Promise<Product> {
    if (price <= 0) {
      throw new AppError('Não informado preço do produto.')
    }

    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      throw new AppError('Supplier not found')
    }

    const product = await this.productsRepository.create({
      title,
      description,
      price,
      supplier
    })

    return product
  }
}
