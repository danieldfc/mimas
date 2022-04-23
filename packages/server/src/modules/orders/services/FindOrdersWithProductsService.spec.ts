import FakeOrdersRepository from '../infra/typeorm/repositories/fakes/FakeOrdersRepository'
import FakeProductsOrdersRepository from '../infra/typeorm/repositories/fakes/FakeProductsOrdersRepository'
import FakeProductsRepository from '../infra/typeorm/repositories/fakes/FakeProductsRepository'
import { CreateOrderService } from './CreateOrderService'
import { FindOrdersWithProductsService } from './FindOrdersWithProductsService'

let fakeOrdersRepository: FakeOrdersRepository
let findOrdersWithProductsService: FindOrdersWithProductsService

let fakeProductsRepository: FakeProductsRepository
let fakeProductsOrdersRepository: FakeProductsOrdersRepository
let createOrderService: CreateOrderService

describe('FindOrdersWithProducts', () => {
  beforeEach(() => {
    fakeOrdersRepository = new FakeOrdersRepository()
    fakeProductsRepository = new FakeProductsRepository()
    fakeProductsOrdersRepository = new FakeProductsOrdersRepository()
    createOrderService = new CreateOrderService(
      fakeOrdersRepository,
      fakeProductsRepository,
      fakeProductsOrdersRepository
    )

    findOrdersWithProductsService = new FindOrdersWithProductsService(
      fakeOrdersRepository
    )
  })

  it('should be able to find all orders with orderProduct relation', async () => {
    const product = await fakeProductsRepository.create({
      title: 'Meu novo pedido',
      description: 'Meu pedido descrição',
      price: 200
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
      workmanship: 200
    })

    fakeOrdersRepository.associateProduct(order.id, product, qtdProduct)

    const ordersWithProduct = await findOrdersWithProductsService.execute({
      first: 10,
      offset: 0
    })

    const firstOrder = ordersWithProduct[0]

    expect(firstOrder).toHaveProperty('orderProducts')
    expect(firstOrder.orderProducts[0].order.id).toBe(firstOrder.id)
  })
})
