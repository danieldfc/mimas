import ICreateProductOrderDTO from '@modules/orders/dtos/ICreateProductOrderDTO'
import { ProductOrder } from '../entities/ProductOrder'

export default interface IProductsOrdersRepository {
  create(data: ICreateProductOrderDTO): Promise<ProductOrder>
  save(productOrder: ProductOrder): Promise<void>
}
