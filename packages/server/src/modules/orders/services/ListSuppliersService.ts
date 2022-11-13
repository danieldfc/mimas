import { inject, injectable } from 'tsyringe'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'

@injectable()
export class ListSuppliersService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository
  ) {}

  async execute(): Promise<Supplier[]> {
    return this.suppliersRepository.list()
  }
}
