import ICreateProductDTO from '@modules/orders/dtos/ICreateProductDTO'
import { Product } from '../entities/Product'

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>
  findByIds(id: string[]): Promise<Product[]>
  findById(id: string): Promise<Product | undefined>
  findAll(): Promise<Product[]>
  save(product: Product): Promise<void>
  destroy(id: string): Promise<void>
}
