import { AppError } from '@shared/errors/AppError'
import { TypePix } from '@shared/utils'
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

  it('should not be able to update supplier with key pix invalid', async () => {
    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999',
      keyPix: 'fornecedor@email.com',
      typePix: TypePix.EMAIL,
      phoneSecondary: '(83) 99999-9999'
    })

    await expect(
      updateSuppliersService.execute(supplier.id, {
        keyPix: 'aaaaa',
        typePix: TypePix.RANDOM
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update supplier with type pix invalid', async () => {
    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999',
      keyPix: 'fornecedor@email.com',
      typePix: TypePix.EMAIL,
      phoneSecondary: '(83) 99999-9999'
    })

    await expect(
      updateSuppliersService.execute(supplier.id, {
        keyPix: supplier.email,
        typePix: TypePix.RANDOM
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update supplier with key pix invalid not update type', async () => {
    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999',
      keyPix: 'fornecedor@email.com',
      typePix: TypePix.EMAIL,
      phoneSecondary: '(83) 99999-9999'
    })

    await expect(
      updateSuppliersService.execute(supplier.id, {
        keyPix: 'aaaaa'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update supplier with type pix invalid not update key', async () => {
    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999',
      keyPix: 'fornecedor@email.com',
      typePix: TypePix.EMAIL,
      phoneSecondary: '(83) 99999-9999'
    })

    await expect(
      updateSuppliersService.execute(supplier.id, {
        typePix: TypePix.CPF_CNPJ
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
