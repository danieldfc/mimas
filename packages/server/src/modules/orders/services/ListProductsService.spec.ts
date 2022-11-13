import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import { ListProductsService } from './ListProductsService'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { Supplier } from '../infra/typeorm/entities/Supplier'

let fakeProductsRepository: FakeProductsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let listProductsService: ListProductsService

describe('ListProducts', () => {
  let supplier: Supplier
  beforeEach(async () => {
    fakeProductsRepository = new FakeProductsRepository()
    fakeSuppliersRepository = new FakeSuppliersRepository()
    listProductsService = new ListProductsService(fakeProductsRepository)

    supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      phone: '(83) 99999-9999',
      address: 'Rua Tal, nº99'
    })
  })

  it('should be able to create a new product', async () => {
    await fakeProductsRepository.create({
      description: 'Minha descrição do produto',
      title: 'Meu título do produto',
      price: 200,
      supplier
    })

    const products = await listProductsService.execute()

    expect(products[0]).toHaveProperty('id')
    expect(products[0].title).toEqual('Meu título do produto')
    expect(products[0].price).toEqual('$200')
  })
})
