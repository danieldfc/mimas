import { AppError } from '@shared/errors/AppError'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import { CreateProductService } from './CreateProductService'

let fakeProductsRepository: FakeProductsRepository
let createProductService: CreateProductService

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository()
    createProductService = new CreateProductService(fakeProductsRepository)
  })

  it('should be able to create a new product', async () => {
    const product = await createProductService.execute({
      description: 'Minha descrição do produto',
      title: 'Meu título do produto',
      price: 200
    })

    expect(product).toHaveProperty('id')
  })

  it('should not be able to create a new product with price = 0', async () => {
    await expect(
      createProductService.execute({
        description: 'Minha descrição do produto',
        title: 'Meu título do produto',
        price: 0
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new product with price < 0', async () => {
    await expect(
      createProductService.execute({
        description: 'Minha descrição do produto',
        title: 'Meu título do produto',
        price: -1
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
