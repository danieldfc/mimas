import { Client } from '@modules/clients/infra/typeorm/entities/Client'
import FakeClientsRepository from '@modules/clients/infra/typeorm/repositories/fakes/FakeClientsRepository'
import FakeOrdersRepository from '../infra/typeorm/repositories/fakes/FakeOrdersRepository'
import FakeProductsOrdersRepository from '../infra/typeorm/repositories/fakes/FakeProductsOrdersRepository'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import { CreateOrderService } from './CreateOrderService'
import { FindOrdersWithProductsService } from './FindOrdersWithProductsService'

let fakeOrdersRepository: FakeOrdersRepository
let findOrdersWithProductsService: FindOrdersWithProductsService

let fakeProductsRepository: FakeProductsRepository
let fakeProductsOrdersRepository: FakeProductsOrdersRepository
let fakeClientsRepository: FakeClientsRepository
let createOrderService: CreateOrderService

describe('FindOrdersWithProducts', () => {
  let client: Client

  beforeEach(async () => {
    fakeOrdersRepository = new FakeOrdersRepository()
    fakeProductsRepository = new FakeProductsRepository()
    fakeProductsOrdersRepository = new FakeProductsOrdersRepository()
    fakeClientsRepository = new FakeClientsRepository()
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
      fakeProductsOrdersRepository,
      fakeClientsRepository
    )

    findOrdersWithProductsService = new FindOrdersWithProductsService(
      fakeOrdersRepository
    )

    const product = await fakeProductsRepository.create({
      title: 'Meu novo pedido',
      description: 'Meu pedido descrição',
      price: 200
    })

    client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999'
    })

    const qtdProduct = 12

    const order = await createOrderService.execute({
      title: 'Meu novo pedido',
      description: 'Minha descrição do pedido',
      products: [
        {
          productId: product.id,
          qtd: qtdProduct
        }
      ],
      workmanship: 200,
      clientId: client.id
    })

    fakeOrdersRepository.associateProduct(order.id, product, qtdProduct)
    fakeOrdersRepository.associateClient(order.id, client)
  })

  it('should be able to find all orders with orderProduct relation', async () => {
    const ordersWithProduct = await findOrdersWithProductsService.execute({
      first: 10,
      offset: 0
    })

    const firstOrder = ordersWithProduct[0]

    expect(firstOrder).toHaveProperty('orderProducts')
    expect(firstOrder.orderProducts[0].order.id).toBe(firstOrder.id)
    expect(firstOrder.orderProducts[0].order.clients[0].id).toBe(client.id)
  })

  it('should be able to find all orders with orderProduct relation whithout elements paginate', async () => {
    const ordersWithProduct = await findOrdersWithProductsService.execute({})

    const firstOrder = ordersWithProduct[0]

    expect(firstOrder).toHaveProperty('orderProducts')
    expect(firstOrder.orderProducts[0].order.id).toBe(firstOrder.id)
    expect(firstOrder.orderProducts[0].order.clients[0].id).toBe(client.id)
  })
})
