import { Client } from '@modules/clients/infra/typeorm/entities/Client'
import FakeClientsRepository from '@modules/clients/infra/typeorm/repositories/fakes/FakeClientsRepository'
import { Product } from '../infra/typeorm/entities/Product'
import { Supplier } from '../infra/typeorm/entities/Supplier'
import FakeOrdersRepository from '../infra/typeorm/repositories/fakes/FakeOrdersRepository'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '../infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { CreateOrderService } from './CreateOrderService'
import { FindOrdersWithProductsService } from './FindOrdersWithProductsService'

let fakeOrdersRepository: FakeOrdersRepository
let findOrdersWithProductsService: FindOrdersWithProductsService

let fakeProductsRepository: FakeProductsRepository
let fakeClientsRepository: FakeClientsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let createOrderService: CreateOrderService

describe('FindOrdersWithProducts', () => {
  let client: Client
  let product: Product
  let supplier: Supplier
  const qtdProduct = 12

  beforeEach(async () => {
    fakeSuppliersRepository = new FakeSuppliersRepository()
    fakeOrdersRepository = new FakeOrdersRepository()
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

    findOrdersWithProductsService = new FindOrdersWithProductsService(
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

    const order = await createOrderService.execute({
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
      deliveryAt: null
    })

    fakeOrdersRepository.associateClient(order.id, client)
  })

  it('should be able to find all orders with orderProduct relation', async () => {
    const ordersWithProduct = await findOrdersWithProductsService.execute({
      first: 10,
      offset: 0
    })

    const firstOrder = ordersWithProduct[0]

    expect(firstOrder).toHaveProperty('metadado')
    expect(firstOrder.metadado).toEqual(
      expect.arrayContaining([
        {
          id: product.id,
          description: product.description,
          price: parseInt(product.price.replace('$', '')),
          qtd: qtdProduct,
          title: product.title
        }
      ])
    )
  })

  it('should be able to find all orders with orderProduct relation whithout elements paginate', async () => {
    const ordersWithProduct = await findOrdersWithProductsService.execute({})

    const firstOrder = ordersWithProduct[0]

    expect(firstOrder).toHaveProperty('metadado')
    expect(firstOrder.metadado).toEqual(
      expect.arrayContaining([
        {
          id: product.id,
          description: product.description,
          price: parseInt(product.price.replace('$', '')),
          qtd: qtdProduct,
          title: product.title
        }
      ])
    )
  })
})
