import { AppError } from '@shared/errors/AppError'
import { CheckEmail } from '@shared/utils'
import { CheckPhone } from '@shared/utils/CheckPhone'
import { inject, injectable } from 'tsyringe'
import ICreateSuppliersDTO from '../dtos/ICreateSuppliersDTO'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'
import { CheckKeyPix } from '../utils/CheckKeyPix'

@injectable()
export class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository
  ) {}

  async execute({
    address,
    email,
    name,
    phone,
    phoneSecondary,
    keyPix,
    typePix
  }: ICreateSuppliersDTO): Promise<Supplier> {
    if (!new CheckEmail(email).verify()) {
      throw new AppError('E-mail invalid')
    }

    if (!new CheckPhone(phone).verify()) {
      throw new AppError('Phone invalid')
    }

    const supplierDuplicate = await this.suppliersRepository.findByEmail(email)

    if (supplierDuplicate) {
      throw new AppError('Supplier duplicated, register with another e-mail.')
    }

    if ((typePix && !keyPix) || (!typePix && keyPix)) {
      throw new AppError("Inform the supplier's pix key")
    }

    if (typePix && keyPix && !new CheckKeyPix().isValid(typePix, keyPix)) {
      throw new AppError('Key pix invalid')
    }

    return this.suppliersRepository.create({
      email,
      address,
      name,
      phone,
      phoneSecondary,
      keyPix,
      typePix
    })
  }
}
