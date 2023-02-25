import { Repository, getRepository } from 'typeorm'
import ICreateSuppliersDTO from '@modules/orders/dtos/ICreateSuppliersDTO'
import { Supplier } from '../entities/Supplier'
import ISuppliersRepository from './ISuppliersRepository'

export default class SuppliersRepository implements ISuppliersRepository {
  private ormRepository: Repository<Supplier>

  constructor() {
    this.ormRepository = getRepository(Supplier)
  }

  async create({
    name,
    email,
    address,
    phone
  }: ICreateSuppliersDTO): Promise<Supplier> {
    const supplier = this.ormRepository.create({
      name,
      email,
      address,
      phone
    })

    await this.save(supplier)

    return supplier
  }

  async save(supplier: Supplier): Promise<void> {
    await this.ormRepository.save(supplier)
  }

  findByEmail(email: string): Promise<Supplier | undefined> {
    return this.ormRepository.findOne({
      where: { email }
    })
  }

  findById(id: string): Promise<Supplier | undefined> {
    return this.ormRepository.findOne({
      where: { id },
      relations: ['products']
    })
  }

  list(): Promise<Supplier[]> {
    return this.ormRepository.find({
      relations: ['products']
    })
  }

  async destroy(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
