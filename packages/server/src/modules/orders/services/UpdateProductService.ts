import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Product, ProductType } from '../infra/typeorm/entities/Product'
import IProductsRepository from '../infra/typeorm/repositories/IProductsRepository'

interface IRequestDTO {
  productId: string
  supplierId: string
  title?: string
  description?: string
  price?: string
  maximumAmount?: number
  type?: ProductType
}

@injectable()
export class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    productId,
    supplierId,
    title,
    description,
    price,
    maximumAmount,
    type
  }: IRequestDTO): Promise<Product> {
    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('Product not found.')
    }

    if (product.supplierId !== supplierId) {
      throw new AppError('Product is not from this supplier.')
    }

    Object.assign(product, {
      title,
      description,
      price,
      maximumAmount,
      type
    })

    await this.productsRepository.save(product)

    return product
  }
}
