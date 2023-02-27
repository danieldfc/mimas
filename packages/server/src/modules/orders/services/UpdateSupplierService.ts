import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import IUpdateSupplierDTO from '../dtos/IUpdateSuppliersDTO'
import { Supplier, TypePix } from '../infra/typeorm/entities/Supplier'
import ISuppliersRepository from '../infra/typeorm/repositories/ISuppliersRepository'
import { CheckKeyPix } from '../utils/CheckKeyPix'

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

    if (
      this.verifyCheckPix(supplier, data) &&
      !new CheckKeyPix().isValid(data.typePix as TypePix, data.keyPix ?? '')
    ) {
      throw new AppError('Key pix invalid')
    }

    Object.assign(supplier, { ...data })

    await this.suppliersRepository.save(supplier)

    return supplier
  }

  private verifyCheckPix(
    supplier: Supplier,
    data: IUpdateSupplierDTO
  ): boolean {
    return (
      ((data.keyPix && supplier.keyPix !== data.keyPix) ||
        (data.typePix && supplier.typePix !== data.typePix)) ??
      false
    )
  }
}
