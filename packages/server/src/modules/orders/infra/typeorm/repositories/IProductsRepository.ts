import ICreateProductDTO from '@modules/orders/dtos/ICreateProductDTO'
import { Product } from '../entities/Product'

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>
  findByIds(id: string[]): Promise<Product[]>
  save(product: Product): Promise<void>
}
