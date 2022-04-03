import { AppError } from '@shared/errors/AppError'

import FakeOrdersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeOrdersRepository'
import { CreateOrderService } from './CreateOrderService'
import { randomUUID } from 'crypto'

let fakeOrdersRepository: FakeOrdersRepository
let createOrderService: CreateOrderService

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository()
    createOrderService = new CreateOrderService(fakeOrdersRepository)
  })

  it('should be able to create a new order', async () => {
    const order = await createOrderService.execute({
      workmanship: 200,
      title: 'Meu novo pedido',
      description: 'Minha descrição de pedido',
      products: [
        {
          productId: randomUUID(),
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
