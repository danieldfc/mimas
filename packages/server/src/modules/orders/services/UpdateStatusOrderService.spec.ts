import FakeClientsRepository from '@modules/clients/infra/typeorm/repositories/fakes/FakeClientsRepository'
import FakeOrdersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeOrdersRepository'
import { AppError } from '@shared/errors/AppError'
import {
  Order,
  StatusOrder
} from '@modules/orders/infra/typeorm/entities/Order'
import { Supplier } from '@modules/orders/infra/typeorm/entities/Supplier'
import FakeProductsRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeProductsRepository'
import FakeSuppliersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeSuppliersRepository'
import { UpdateStatusOrderService } from './UpdateStatusOrderService'

let fakeOrdersRepository: FakeOrdersRepository
let fakeProductsRepository: FakeProductsRepository
let fakeClientsRepository: FakeClientsRepository
let fakeSuppliersRepository: FakeSuppliersRepository
let updateStatusOrderService: UpdateStatusOrderService

describe('UpdateStatusOrder', () => {
  let order: Order
  let supplier: Supplier

  beforeEach(async () => {
    fakeOrdersRepository = new FakeOrdersRepository()
    fakeSuppliersRepository = new FakeSuppliersRepository()
    fakeProductsRepository = new FakeProductsRepository()
    fakeClientsRepository = new FakeClientsRepository()
    updateStatusOrderService = new UpdateStatusOrderService(
      fakeOrdersRepository
    )

    supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      address: 'Rua tal, nº99, bairro tal',
      phone: '(83) 99999-9999'
    })

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

    const priceProducts = Number(product.price.replace('$', ''))
    const qtdProducts = 12

    order = await fakeOrdersRepository.create({
      workmanship: 200,
      title: 'Meu novo pedido',
      description: 'Minha descrição de pedido',
      metadado: [
        {
          id: product.id,
          qtd: qtdProducts,
          title: product.title,
          description: product.description,
          price: priceProducts
        }
      ],
      clients: [client],
      deliveryAt,
      priceProducts: priceProducts * qtdProducts
    })
    supplier = await fakeSuppliersRepository.create({
      name: 'Nome fornecedor',
      email: 'fornecedor@email.com',
      phone: '(83) 99999-9999',
      address: 'Rua Tal, nº99'
    })
  })

  it('should be able update a order status to "finish"', async () => {
    const { status } = await updateStatusOrderService.execute({
      orderId: order.id,
      status: StatusOrder.FINISH
    })

    expect(status).toBe(StatusOrder.FINISH)
  })

  it('should not be able update a order status whithout order id invalid', async () => {
    await expect(
      updateStatusOrderService.execute({
        orderId: 'non-id-valid',
        status: StatusOrder.FINISH
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
