import ICreateSuppliersDTO from '@modules/orders/dtos/ICreateSuppliersDTO'
import { Supplier } from '../entities/Supplier'

export default interface ISuppliersRepository {
  create(data: ICreateSuppliersDTO): Promise<Supplier>
  save(supplier: Supplier): Promise<void>
  findByEmail(email: string): Promise<Supplier | undefined>
  findById(id: string): Promise<Supplier | undefined>
  list(): Promise<Supplier[]>
  destroy(id: string): Promise<void>
}
