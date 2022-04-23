import FakeOrdersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeOrdersRepository'
import { AppError } from '@shared/errors/AppError'
import FakeProductsOrdersRepository from '../infra/typeorm/repositories/fakes/FakeProductsOrdersRepository'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import { CreateOrderService } from './CreateOrderService'

let fakeOrdersRepository: FakeOrdersRepository
let fakeProductsRepository: FakeProductsRepository
let fakeProductsOrdersRepository: FakeProductsOrdersRepository
let createOrderService: CreateOrderService

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository()
    fakeProductsRepository = new FakeProductsRepository()
    fakeProductsOrdersRepository = new FakeProductsOrdersRepository()
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
      fakeProductsOrdersRepository
    )
  })

  it('should be able to create a new order', async () => {
    const product = await fakeProductsRepository.create({
      title: 'meu novo produto',
      description: 'Meu item incrível',
      price: 200
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
      ]
    })

    expect(order).toHaveProperty('id')
  })

  it('should not be able to create a new order without products', async () => {
    await expect(
      createOrderService.execute({
        workmanship: 200,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        products: []
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new order with workmanship = 0', async () => {
    await expect(
      createOrderService.execute({
        workmanship: 0,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        products: []
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new order with workmanship < 0', async () => {
    await expect(
      createOrderService.execute({
        workmanship: -1,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        products: []
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})