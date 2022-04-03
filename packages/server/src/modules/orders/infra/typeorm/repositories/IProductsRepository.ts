import ICreateProductDTO from '@modules/orders/dtos/ICreateProductDTO'
import { Product } from '../entities/Product'

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>
  findById(id: string): Promise<Product | undefined>
  save(product: Product): Promise<void>
}
