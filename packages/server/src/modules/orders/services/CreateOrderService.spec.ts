import { v4 as uuidV4 } from 'uuid'
import FakeClientsRepository from '@modules/clients/infra/typeorm/repositories/fakes/FakeClientsRepository'
import FakeOrdersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeOrdersRepository'
import { AppError } from '@shared/errors/AppError'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { CreateOrderService } from './CreateOrderService'

let fakeOrdersRepository: FakeOrdersRepository
let fakeProductsRepository: FakeProductsRepository
let fakeClientsRepository: FakeClientsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let createOrderService: CreateOrderService

describe('CreateOrder', () => {
  let supplier: Supplier
  beforeEach(async () => {
    fakeOrdersRepository = new FakeOrdersRepository()
    fakeSuppliersRepository = new FakeSuppliersRepository()
    fakeProductsRepository = new FakeProductsRepository()
    fakeClientsRepository = new FakeClientsRepository()
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
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

    const now = new Date()
    const twoDayInFuture = 2
    const horaAvailable = '07'
    const deliveryAt = new Date(
      `${now.getFullYear()}-${now.getMonth() + 1}-${
        now.getDate() + twoDayInFuture
      }T${horaAvailable}:00:00-00:00`
    )

    const order = await createOrderService.execute({
      workmanship: 200,
      title: 'Meu novo pedido',
      description: 'Minha descrição de pedido',
      metadado: [
        {
          productId: product.id,
          qtd: 12
        }
      ],
      clientsId: [client.id],
      deliveryAt
    })

    expect(order).toHaveProperty('id')
    expect(order.workmanship).toEqual(200)
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
        metadado: [],
        clientsId: [client.id],
        deliveryAt: null
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
        metadado: [],
        clientsId: [client.id],
        deliveryAt: null
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
        metadado: [],
        clientsId: [client.id],
        deliveryAt: null
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new order without client', async () => {
    await expect(
      createOrderService.execute({
        workmanship: -1,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        metadado: [],
        clientsId: [uuidV4()],
        deliveryAt: null
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new order with delivery date <= now', async () => {
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

    const deliveryAt = new Date()

    await expect(
      createOrderService.execute({
        workmanship: 100,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        metadado: [
          {
            productId: product.id,
            qtd: 12
          }
        ],
        clientsId: [client.id],
        deliveryAt
      })
    ).rejects.toBeInstanceOf(AppError)

    deliveryAt.setMilliseconds(deliveryAt.getMilliseconds() - 1)

    await expect(
      createOrderService.execute({
        workmanship: 100,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        metadado: [
          {
            productId: product.id,
            qtd: 12
          }
        ],
        clientsId: [client.id],
        deliveryAt
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new order with delivery date exceeds deadlines', async () => {
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

    const padStart = (str: string, tam: number, preenchimento: string) =>
      str.padStart(tam, preenchimento)

    const now = new Date()
    const twoDayInFuture = 2
    let hoursAvailable = '06'
    const month = padStart(String(now.getMonth() + 1), 2, '0')
    const day = padStart(String(now.getDate() + twoDayInFuture), 2, '0')

    let deliveryAt = new Date(
      `${now.getFullYear()}-${month}-${day}T${hoursAvailable}:00:00-00:00`
    )

    await expect(
      createOrderService.execute({
        workmanship: 100,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        metadado: [
          {
            productId: product.id,
            qtd: 12
          }
        ],
        clientsId: [client.id],
        deliveryAt
      })
    ).rejects.toBeInstanceOf(AppError)

    hoursAvailable = '17'
    deliveryAt = new Date(
      `${now.getFullYear()}-${month}-${day}T${hoursAvailable}:00:00-00:00`
    )

    await expect(
      createOrderService.execute({
        workmanship: 100,
        title: 'Meu novo pedido',
        description: 'Minha descrição de pedido',
        metadado: [
          {
            productId: product.id,
            qtd: 12
          }
        ],
        clientsId: [client.id],
        deliveryAt
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
