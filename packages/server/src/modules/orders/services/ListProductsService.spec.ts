import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import { ListProductsService } from './ListProductsService'

let fakeProductsRepository: FakeProductsRepository
let listProductsService: ListProductsService

describe('ListProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository()
    listProductsService = new ListProductsService(fakeProductsRepository)
  })

  it('should be able to create a new product', async () => {
    await fakeProductsRepository.create({
      description: 'Minha descrição do produto',
      title: 'Meu título do produto',
      price: 200
    })

    const products = await listProductsService.execute()

    expect(products[0]).toHaveProperty('id')
    expect(products[0].title).toEqual('Meu título do produto')
    expect(products[0].price).toEqual('$200')
  })
})
