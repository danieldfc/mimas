import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'

@injectable()
export class DeleteSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    const supplier = await this.suppliersRepository.findById(id)

    if (!supplier) {
      throw new AppError('Supplier not found.')
    }

    await this.suppliersRepository.destroy(supplier.id)

    return true
  }
}
