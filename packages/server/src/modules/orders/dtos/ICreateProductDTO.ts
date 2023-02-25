import { ProductType } from '../infra/typeorm/entities/Product'
import { Supplier } from '../infra/typeorm/entities/Supplier'

export default interface ICreateProductDTO {
  title: string
  description: string
  price: number
  supplier: Supplier
  type?: ProductType
  maximumAmount?: number
}
