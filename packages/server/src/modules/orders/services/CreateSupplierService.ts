import { AppError } from '@shared/errors/AppError'
import { CheckEmail } from '@shared/utils'
import { CheckFone } from '@shared/utils/CheckFone'
import { inject, injectable } from 'tsyringe'
import ICreateSuppliersDTO from '../dtos/ICreateSuppliersDTO'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'

@injectable()
export class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository
  ) {}

  async execute({
    email,
    address,
    name,
    phone
  }: ICreateSuppliersDTO): Promise<Supplier> {
    if (!new CheckEmail(email).verify()) {
      throw new AppError('E-mail invalid')
    }

    if (!new CheckFone(phone).verify()) {
      throw new AppError('Phone invalid')
    }

    const supplierDuplicate = await this.suppliersRepository.findByEmail(email)

    if (supplierDuplicate) {
      throw new AppError('Supplier duplicated, register with another e-mail.')
    }

    return this.suppliersRepository.create({
      email,
      address,
      name,
      phone
    })
  }
}
