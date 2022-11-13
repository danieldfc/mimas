import { AppError } from '@shared/errors/AppError'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { DeleteSupplierService } from './DeleteSupplierService'

let fakeSuppliersRepository: FakeSuppliersRepository
let deleteSupplierService: DeleteSupplierService

describe('DeleteSupplier', () => {
  beforeEach(() => {
    fakeSuppliersRepository = new FakeSuppliersRepository()
    deleteSupplierService = new DeleteSupplierService(fakeSuppliersRepository)
  })

  it('should be able to delete a supplier', async () => {
    const { id } = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999'
    })
    const deleteSupplier = await deleteSupplierService.execute(id)

    expect(deleteSupplier).toBeTruthy()

    const supplierNotFound = await fakeSuppliersRepository.findById(id)

    expect(supplierNotFound).toBeUndefined()
  })

  it('should be able to delete a supplier', async () => {
    await expect(
      deleteSupplierService.execute('non-fornecedor-id')
    ).rejects.toBeInstanceOf(AppError)
  })
})
