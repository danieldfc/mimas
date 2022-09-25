import ICreateProductOrderDTO from '@modules/orders/dtos/ICreateProductOrderDTO'
import { getRepository, Repository } from 'typeorm'
import { ProductOrder } from '../entities/ProductOrder'
import IProductsOrdersRepository from './IProductsOrdersRepository'

export default class ProductsOrdersRepository
  implements IProductsOrdersRepository
{
  private ormRepository: Repository<ProductOrder>

  constructor() {
    this.ormRepository = getRepository(ProductOrder)
  }

  public async create({
    order,
    product,
    qtdProduct
  }: ICreateProductOrderDTO): Promise<ProductOrder> {
    const productOrder = this.ormRepository.create({
      order,
      product,
      qtdProduct
    })

    await this.save(productOrder)

    return productOrder
  }

  async save(productOrder: ProductOrder): Promise<void> {
    await this.ormRepository.save(productOrder)
  }
}
