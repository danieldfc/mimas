import { AppError } from '@shared/errors/AppError'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { DeleteProductService } from './DeleteProductService'

let fakeProductsRepository: FakeProductsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let deleteProductService: DeleteProductService

describe('CreateProduct', () => {
  let supplier: Supplier
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository()
    fakeSuppliersRepository = new FakeSuppliersRepository()
    deleteProductService = new DeleteProductService(
      fakeProductsRepository,
      fakeSuppliersRepository
    )

    supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      phone: '(83) 99999-9999',
      address: 'Rua Tal, nº99'
    })
  })

  it('should be able to delete a product', async () => {
    const { id } = await fakeProductsRepository.create({
      title: 'Meu produto',
      description: 'Minha descrição',
      price: 100,
      supplier
    })
    const deleted = await deleteProductService.execute({
      productId: id,
      supplierId: supplier.id
    })

    expect(deleted).toBeTruthy()
  })

  it('should not be able to delete a product without informing a valid supplierId', async () => {
    const { id } = await fakeProductsRepository.create({
      title: 'Meu produto',
      description: 'Minha descrição',
      price: 100,
      supplier
    })
    expect(
      deleteProductService.execute({
        productId: id,
        supplierId: 'non-id-valid'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a product without informing a valid productId', async () => {
    expect(
      deleteProductService.execute({
        productId: 'non-id-valid',
        supplierId: supplier.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to delete a product associated with another supplier', async () => {
    const supplierOther = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      phone: '(83) 99999-9999',
      address: 'Rua Tal, nº99'
    })
    const { id } = await fakeProductsRepository.create({
      title: 'Meu produto',
      description: 'Minha descrição',
      price: 100,
      supplier: supplierOther
    })
    expect(
      deleteProductService.execute({
        productId: id,
        supplierId: supplier.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
