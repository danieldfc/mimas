import { v4 as uuidV4 } from 'uuid'
import { Client } from '@modules/clients/infra/typeorm/entities/Client'
import FakeClientsRepository from '@modules/clients/infra/typeorm/repositories/fakes/FakeClientsRepository'
import { AppError } from '@shared/errors/AppError'
import { Order } from '@modules/orders/infra/typeorm/entities/Order'
import { Product } from '@modules/orders/infra/typeorm/entities/Product'
import { Supplier } from '@modules/orders/infra/typeorm/entities/Supplier'
import FakeOrdersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeOrdersRepository'
import FakeProductsRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import FakeNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationRepository'

import { CreateOrderService } from './CreateOrderService'
import { ShowOrderWithProductsService } from './ShowOrderWithProductsService'

let fakeOrdersRepository: FakeOrdersRepository
let showOrderWithProductsService: ShowOrderWithProductsService

let fakeProductsRepository: FakeProductsRepository
let fakeClientsRepository: FakeClientsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let createOrderService: CreateOrderService

describe('ShowOrderWithProducts', () => {
  let client: Client
  let product: Product
  let supplier: Supplier
  let order: Order
  const qtdProduct = 12
  const userId = uuidV4()

  beforeEach(async () => {
    fakeSuppliersRepository = new FakeSuppliersRepository()
    fakeOrdersRepository = new FakeOrdersRepository()
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

    showOrderWithProductsService = new ShowOrderWithProductsService(
      fakeOrdersRepository
    )

    product = await fakeProductsRepository.create({
      title: 'Meu novo pedido',
      description: 'Meu pedido descrição',
      price: 200,
      supplier
    })

    client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999'
    })

    order = await createOrderService.execute({
      title: 'Meu novo pedido',
      description: 'Minha descrição do pedido',
      metadado: [
        {
          productId: product.id,
          qtd: qtdProduct
        }
      ],
      workmanship: 200,
      clientsId: [client.id],
      deliveryAt: null,
      userId
    })

    fakeOrdersRepository.associateClient(order.id, client)
  })

  it('should be able to find one order with orderProduct relation', async () => {
    const orderWithProduct = await showOrderWithProductsService.execute({
      idOrder: order.id
    })

    expect(orderWithProduct).toEqual(order)
  })

  it('should not be able to find one order with non-id', async () => {
    await expect(
      showOrderWithProductsService.execute({
        idOrder: 'non-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
