import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import IUpdateSupplierDTO from '../dtos/IUpdateSuppliersDTO'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'

@injectable()
export class UpdateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository
  ) {}

  async execute(id: string, data: IUpdateSupplierDTO = {}): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findById(id)

    if (!supplier) {
      throw new AppError('Supplier not found')
    }

    Object.assign(supplier, { ...data })

    await this.suppliersRepository.save(supplier)

    return supplier
  }
}
