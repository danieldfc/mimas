import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import IProductsRepository from '../infra/typeorm/repositories/IProductsRepository'
import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'

interface IRequestDTO {
  supplierId: string
  productId: string
}

@injectable()
export class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository
  ) {}

  async execute({ supplierId, productId }: IRequestDTO): Promise<boolean> {
    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      throw new AppError('Supplier not found.')
    }

    const product = await this.productsRepository.findById(productId)

    if (!product) {
      throw new AppError('Product not found')
    }

    if (product.supplierId !== supplier.id) {
      throw new AppError('Product not have relationship with supplier')
    }

    await this.productsRepository.destroy(product.id)

    return true
  }
}
