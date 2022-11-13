import { AppError } from '@shared/errors/AppError'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { UpdateSupplierService } from './UpdateSupplierService'

let fakeSuppliersRepository: FakeSuppliersRepository
let updateSuppliersService: UpdateSupplierService

describe('UpdateSupplier', () => {
  beforeEach(() => {
    fakeSuppliersRepository = new FakeSuppliersRepository()
    updateSuppliersService = new UpdateSupplierService(fakeSuppliersRepository)
  })

  it('should be able to update supplier exists', async () => {
    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999'
    })

    const supplierUpdate = await updateSuppliersService.execute(supplier.id, {
      name: 'Novo nome'
    })

    expect(supplierUpdate.name).toEqual('Novo nome')
  })

  it('should be able to update supplier exists not update data', async () => {
    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999'
    })

    const supplierUpdate = await updateSuppliersService.execute(supplier.id)

    expect(supplierUpdate.name).toEqual('Nome fornecedor')
  })

  it('should not be able to update supplier exists', async () => {
    await expect(
      updateSuppliersService.execute('non-id-supplier', {
        name: 'Novo nome'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
