import { AppError } from '@shared/errors/AppError'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { CreateSupplierService } from './CreateSupplierService'

let fakeSuppliersRepository: FakeSuppliersRepository
let createSupplierService: CreateSupplierService

describe('CreateSupplier', () => {
  beforeEach(() => {
    fakeSuppliersRepository = new FakeSuppliersRepository()
    createSupplierService = new CreateSupplierService(fakeSuppliersRepository)
  })

  it('should be able to create a new supplier', async () => {
    const supplier = await createSupplierService.execute({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999'
    })

    expect(supplier).toHaveProperty('id')
  })

  it('should not be able to create a new supplier with email invalid', async () => {
    await expect(
      createSupplierService.execute({
        name: 'Nome fornecedor',
        email: 'not-email',
        address: 'Rua tal, nº99, bairro tal',
        phone: '(83) 99999-9999'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new supplier with duplicate', async () => {
    await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999'
    })

    await expect(
      createSupplierService.execute({
        name: 'Nome fornecedor',
        email: 'fornecedor@email.com',
        address: 'Rua tal, nº99, bairro tal',
        phone: '(83) 99999-9999'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new supplier with duplicate', async () => {
    await expect(
      createSupplierService.execute({
        name: 'Nome fornecedor',
        email: 'fornecedor@email.com',
        address: 'Rua tal, nº99, bairro tal',
        phone: 'non-valid'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
