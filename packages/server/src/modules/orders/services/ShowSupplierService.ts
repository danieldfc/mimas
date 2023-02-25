import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { Supplier } from '@modules/orders/infra/typeorm/entities/Supplier'
import ISuppliersRepository from '@modules/orders/infra/typeorm/repositories/ISuppliersRepository'

type IRequestDTO = {
  id: string
}

@injectable()
export class ShowSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository
  ) {}

  async execute({ id }: IRequestDTO): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findById(id)

    if (!supplier) {
      throw new AppError('Order not found.')
    }

    return supplier
  }
}
