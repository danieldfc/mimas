import { v4 as uuidV4 } from 'uuid'
import { AppError } from '@shared/errors/AppError'

import FakeClientsRepository from '@modules/clients/infra/typeorm/repositories/fakes/FakeClientsRepository'
import FakeOrdersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeOrdersRepository'
import { Supplier } from '@modules/orders/infra/typeorm/entities/Supplier'
import FakeProductsRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import FakeNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationRepository'

import { CreateOrderService } from './CreateOrderService'
import { padStart } from '@shared/utils/StringUtil'
import { ProductType } from '../infra/typeorm/entities/Product'

let fakeOrdersRepository: FakeOrdersRepository
let fakeProductsRepository: FakeProductsRepository
let fakeClientsRepository: FakeClientsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let createOrderService: CreateOrderService

describe('CreateOrder', () => {
  let supplier: Supplier
  const userId = uuidV4()

  beforeEach(async () => {
    fakeOrdersRepository = new FakeOrdersRepository()
    fakeSuppliersRepository = new FakeSuppliersRepository()
    fakeProductsRepository = new FakeProductsRepository()
    fakeClientsRepository = new FakeClientsRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
      fakeClientsRepository,
      fakeNotificationsRepository
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
      supplier,
      maximumAmount: 20,
      type: ProductType.METERS
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
      userId,
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

    const notifications = await fakeNotificationsRepository.findAllByUserId(
      userId
    )
    expect(notifications.length).toEqual(1)

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
        userId,
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
        userId,
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
        userId,
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
        userId,
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
        userId,
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
        userId,
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
      phone: '+5583999999999',
      address: 'Rua tal',
      email: 'johndoe@email.com'
    })

    const now = new Date()
    const twoDayInFuture = 2
    now.setDate(now.getDate() + twoDayInFuture)

    const month = padStart(String(now.getMonth() + 1), 2, '0')
    const day = padStart(String(now.getDate()), 2, '0')

    let hoursAvailable = '06'
    let deliveryAt = new Date(
      `${now.getFullYear()}-${month}-${day}T${hoursAvailable}:00:00-00:00`
    )

    await expect(
      createOrderService.execute({
        userId,
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
        userId,
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

    deliveryAt = new Date(`${now.getFullYear()}-${month}-${day}T16:59:59-00:00`)

    const order = await createOrderService.execute({
      userId,
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

    expect(order).toBeTruthy()
  })
})
