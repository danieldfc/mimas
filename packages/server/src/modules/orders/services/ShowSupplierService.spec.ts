import { AppError } from '@shared/errors/AppError'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { ShowSupplierService } from './ShowSupplierService'

let fakeSuppliersRepository: FakeSuppliersRepository
let showSupplierService: ShowSupplierService

describe('ShowSupplier', () => {
  beforeEach(() => {
    fakeSuppliersRepository = new FakeSuppliersRepository()
    showSupplierService = new ShowSupplierService(fakeSuppliersRepository)
  })

  it('should be able to show supplier with id is valid', async () => {
    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999'
    })

    const result = await showSupplierService.execute({ id: supplier.id })

    expect(result.id).toEqual(supplier.id)
  })

  it('should be able to show supplier with id is valid', async () => {
    await expect(
      showSupplierService.execute({ id: 'non-id-valid' })
    ).rejects.toBeInstanceOf(AppError)
  })
})
