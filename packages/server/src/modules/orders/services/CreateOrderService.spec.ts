import FakeClientsRepository from '@modules/clients/infra/typeorm/repositories/fakes/FakeClientsRepository'
import FakeOrdersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeOrdersRepository'
import { AppError } from '@shared/errors/AppError'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import FakeProductsOrdersRepository from '../infra/typeorm/repositories/fakes/FakeProductsOrdersRepository'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { CreateOrderService } from './CreateOrderService'

let fakeOrdersRepository: FakeOrdersRepository
let fakeProductsRepository: FakeProductsRepository
let fakeProductsOrdersRepository: FakeProductsOrdersRepository
let fakeClientsRepository: FakeClientsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let createOrderService: CreateOrderService

describe('CreateOrder', () => {
  let supplier: Supplier
  beforeEach(async () => {
    fakeOrdersRepository = new FakeOrdersRepository()
    fakeSuppliersRepository = new FakeSuppliersRepository()
    fakeProductsRepository = new FakeProductsRepository()
    fakeProductsOrdersRepository = new FakeProductsOrdersRepository()
    fakeClientsRepository = new FakeClientsRepository()
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
      fakeProductsOrdersRepository,
      fakeClientsRepository
    )

    supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      phone: '(83) 99999-9999',
      address: 'Rua Tal, nº99'
    })
  })

  it('should be able to create a new order', async () => {
    const product = await fakeProductsRepository.create({
      title: 'meu novo produto',
      description: 'Meu item incrível',
      price: 200,
      supplier
    })

    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999'
    })

    const order = await createOrderService.execute({
      workmanship: 200,
      title: 'Meu novo pedido',
      description: 'Minha descrição de pedido',
      products: [
        {
          productId: product.id,
          qtd: 12
        }
      ],
      clientId: client.id
    })

    expect(order).toHaveProperty('id')
  })

  it('should not be able to create a new order without products', async () => {
    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999'
    })

    await expect(
      createOrderService.execute({
        workmanship: 200,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        products: [],
        clientId: client.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new order with workmanship = 0', async () => {
    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999'
    })

    await expect(
      createOrderService.execute({
        workmanship: 0,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        products: [],
        clientId: client.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new order with workmanship < 0', async () => {
    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999'
    })

    await expect(
      createOrderService.execute({
        workmanship: -1,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        products: [],
        clientId: client.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new order without client', async () => {
    await expect(
      createOrderService.execute({
        workmanship: -1,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        products: [],
        clientId: 'not-found'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
