import { inject, injectable } from 'tsyringe'
import { resolve } from 'path'

import INotificationsRepository from '@modules/notifications/infra/typeorm/repositories/INotificationsRepository'
import IOrdersRepository from '@modules/orders/infra/typeorm/repositories/IOrdersRepository'
import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'

import { Order } from '@modules/orders/infra/typeorm/entities/Order'
import { env } from '@config/env'
import { padStart } from '@shared/utils/StringUtil'

type ClienteTemplate = {
  name: string
  phone: string
  email: string
}

type ITemplateDataOrder = {
  name: string
  price: number
  clientes: ClienteTemplate[]
  url: string
  deliveryAt: string
}

@injectable()
export class OrdersTodayService {
  private titleNotification = '[BORDADOS] Pedidos em aberto para hoje'

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  public async execute(): Promise<void> {
    const hasSendMailToday = await this.hasSendMailToday()
    if (!hasSendMailToday) return

    const orders =
      await this.ordersRepository.fetchAllOpenOrdersScheduledForToday()
    const userAdmin = await this.usersRepository.findByEmail(
      'dacia@bordados.com'
    )

    if (orders.length && userAdmin) {
      await this.notificationsRepository.create({
        title: this.titleNotification,
        userId: userAdmin.id,
        description: `Verifique seu e-mail, existe ${orders.length} pedidos em aberto.`
      })
      const ordersTodayTemplate = resolve(
        __dirname,
        '..',
        'views',
        'ordersToday.hbs'
      )
      const now = new Date()
      const day = padStart(String(now.getDate()), 2, '0')
      const month = padStart(String(now.getMonth() + 1), 2, '0')
      this.mailProvider.sendMail({
        to: {
          email: userAdmin.email,
          name: userAdmin.name
        },
        subject: `[BORDADOS] Seus pedidos para hoje ${day}/${month}/${now.getFullYear()}`,
        templateData: {
          file: ordersTodayTemplate,
          variables: {
            username: userAdmin.name,
            orders: this.getDataTemplate(orders)
          }
        }
      })
    }
  }

  private async hasSendMailToday(): Promise<boolean> {
    return !(await this.notificationsRepository.findByTitleToday(
      this.titleNotification
    ))
  }

  private getDataTemplate(orders: Order[]): ITemplateDataOrder[] {
    return orders.map(order => ({
      name: order.title,
      price: order.finalPrice,
      clientes: this.getClientes(order),
      url: this.getUrlOrder(order),
      deliveryAt: this.getDeliveryAt(order)
    }))
  }

  private getClientes(order: Order): ClienteTemplate[] {
    if (!order.clients?.length) return []
    return order.clients.map(client => ({
      name: client.name,
      email: client?.email ?? 'N/A',
      phone: client.phone
    }))
  }

  private getUrlOrder(order: Order): string {
    return `${env.linkWeb}/orders/${order.id}`
  }

  private getDeliveryAt({ deliveryAt }: Order): string {
    if (!deliveryAt) return 'N/A'
    const hours = padStart(String(deliveryAt.getHours()), 2, '0')
    const minutes = padStart(String(deliveryAt.getMinutes()), 2, '0')
    return `${hours}:${minutes}h`
  }
}
