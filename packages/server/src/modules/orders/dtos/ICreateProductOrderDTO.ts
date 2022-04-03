import { Order } from '../infra/typeorm/entities/Order'
import { Product } from '../infra/typeorm/entities/Product'

export default interface ICreateProductOrderDTO {
  order: Order
  product: Product
  qtdProduct: number
}
