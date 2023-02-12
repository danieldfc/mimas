import FakeNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationRepository'
import FakeOrdersRepository from '@modules/orders/infra/typeorm/repositories/fakes/FakeOrdersRepository'
import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'

import { OrdersTodayService } from './OrdersTodayService'
import { User } from '@modules/users/infra/typeorm/entities/User'
import { Order } from '../infra/typeorm/entities/Order'
import { padStart } from '@shared/utils/StringUtil'
import FakeClientsRepository from '@modules/clients/infra/typeorm/repositories/fakes/FakeClientsRepository'

let fakeOrdersRepository: FakeOrdersRepository
let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeClientsRepository: FakeClientsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let ordersTodayService: OrdersTodayService

describe('OrdersToday', () => {
  let user: User
  let order: Order

  const now = new Date()
  const month = padStart(String(now.getMonth() + 1), 2, '0')
  const day = padStart(String(now.getDate()), 2, '0')
  const deliveryAt = new Date(
    `${now.getFullYear()}-${month}-${day}T09:00:00-00:00`
  )

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeOrdersRepository = new FakeOrdersRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeClientsRepository = new FakeClientsRepository()

    ordersTodayService = new OrdersTodayService(
      fakeUsersRepository,
      fakeNotificationsRepository,
      fakeOrdersRepository,
      fakeMailProvider
    )

    user = await fakeUsersRepository.create({
      email: 'dacia@bordados.com',
      name: 'Dacia Bordados',
      nick: 'daciabordados',
      password: '123456'
    })

    const client = await fakeClientsRepository.create({
      name: 'Client 1',
      phone: '99 99999-9999',
      email: 'client@email.com'
    })

    order = await fakeOrdersRepository.create({
      title: 'Meu incrível pedido',
      description: 'Minha descrição',
      workmanship: 100,
      priceProducts: 200,
      metadado: [],
      clients: [client],
      deliveryAt
    })
  })

  it('should be able to send notification orders today', async () => {
    await ordersTodayService.execute()

    const notificacoes = await fakeNotificationsRepository.findAllByUserId(
      user.id
    )

    expect(notificacoes.length).toBe(1)
  })

  it('should be able to send notification orders today without client', async () => {
    await fakeOrdersRepository.destroy(order)

    order = await fakeOrdersRepository.create({
      title: 'Meu incrível pedido',
      description: 'Minha descrição',
      workmanship: 100,
      priceProducts: 200,
      metadado: [],
      clients: [],
      deliveryAt
    })

    await ordersTodayService.execute()

    const notificacoes = await fakeNotificationsRepository.findAllByUserId(
      user.id
    )

    expect(notificacoes.length).toBe(1)
  })

  it('should be able to send notification orders today with client not email', async () => {
    await fakeOrdersRepository.destroy(order)

    const client = await fakeClientsRepository.create({
      name: 'Client 1',
      phone: '99 99999-9999'
    })

    order = await fakeOrdersRepository.create({
      title: 'Meu incrível pedido',
      description: 'Minha descrição',
      workmanship: 100,
      priceProducts: 200,
      metadado: [],
      clients: [client],
      deliveryAt
    })

    await ordersTodayService.execute()

    const notificacoes = await fakeNotificationsRepository.findAllByUserId(
      user.id
    )

    expect(notificacoes.length).toBe(1)
  })

  it('should be able to send notification orders today without delivery at', async () => {
    await fakeOrdersRepository.destroy(order)

    const client = await fakeClientsRepository.create({
      name: 'Client 1',
      phone: '99 99999-9999'
    })

    order = await fakeOrdersRepository.create({
      title: 'Meu incrível pedido',
      description: 'Minha descrição',
      workmanship: 100,
      priceProducts: 200,
      metadado: [],
      clients: [client],
      deliveryAt: null
    })

    await ordersTodayService.execute()

    const notificacoes = await fakeNotificationsRepository.findAllByUserId(
      user.id
    )

    expect(notificacoes.length).toBe(1)
  })

  it('should not be able to send notification orders today already existing notification', async () => {
    await fakeNotificationsRepository.create({
      title: '[BORDADOS] Pedidos em aberto para hoje',
      userId: user.id,
      description: `Verifique seu e-mail, existe 1 em aberto.`
    })

    await ordersTodayService.execute()

    const notificacoes = await fakeNotificationsRepository.findAllByUserId(
      user.id
    )

    expect(notificacoes.length).toBe(1)
  })
})
