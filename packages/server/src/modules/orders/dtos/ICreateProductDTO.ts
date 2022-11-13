import { Supplier } from '../infra/typeorm/entities/Supplier'

export default interface ICreateProductDTO {
  title: string
  description: string
  price: number
  supplier: Supplier
}
