import ICreateSuppliersDTO from '@modules/orders/dtos/ICreateSuppliersDTO'
import { Supplier } from '../../entities/Supplier'
import ISuppliersRepository from '../ISuppliersRepository'

export default class FakeSuppliersRepository implements ISuppliersRepository {
  private suppliers: Supplier[] = []

  async create(data: ICreateSuppliersDTO): Promise<Supplier> {
    const supplier = new Supplier()

    Object.assign(supplier, {
      ...data,
      id: this.suppliers.length + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    })

    this.suppliers.push(supplier)

    return supplier
  }

  async save(supplier: Supplier): Promise<void> {
    const findSupplierIndex = this.suppliers.findIndex(
      s => s.id === supplier.id
    )

    this.suppliers[findSupplierIndex] = supplier
  }

  async findByEmail(email: string): Promise<Supplier | undefined> {
    return this.suppliers.find(s => s.email === email)
  }

  async findById(id: string): Promise<Supplier | undefined> {
    return this.suppliers.find(s => s.id === id)
  }

  async list(): Promise<Supplier[]> {
    return this.suppliers
  }

  async destroy(id: string): Promise<void> {
    const findIndex = this.suppliers.findIndex(s => s.id === id)
    if (findIndex > -1) {
      this.suppliers.splice(findIndex, 1)
    }
  }
}
