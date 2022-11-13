import { AppError } from '@shared/errors/AppError'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { CreateProductService } from './CreateProductService'

let fakeProductsRepository: FakeProductsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let createProductService: CreateProductService

describe('CreateProduct', () => {
  let supplierId: string
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository()
    fakeSuppliersRepository = new FakeSuppliersRepository()
    createProductService = new CreateProductService(
      fakeProductsRepository,
      fakeSuppliersRepository
    )

    const supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      phone: '(83) 99999-9999',
      address: 'Rua Tal, nº99'
    })

    supplierId = supplier.id
  })

  it('should be able to create a new product', async () => {
    const product = await createProductService.execute({
      description: 'Minha descrição do produto',
      title: 'Meu título do produto',
      price: 200,
      supplierId
    })

    expect(product).toHaveProperty('id')
  })

  it('should not be able to create a new product with price = 0', async () => {
    await expect(
      createProductService.execute({
        description: 'Minha descrição do produto',
        title: 'Meu título do produto',
        price: 0,
        supplierId
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new product with price < 0', async () => {
    await expect(
      createProductService.execute({
        description: 'Minha descrição do produto',
        title: 'Meu título do produto',
        price: -1,
        supplierId
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new product without supplier', async () => {
    await expect(
      createProductService.execute({
        description: 'Minha descrição do produto',
        title: 'Meu título do produto',
        price: 1,
        supplierId: 'non-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
