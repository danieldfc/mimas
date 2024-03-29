import { v4 as uuidV4 } from 'uuid'
import {
  ICreateNotification,
  IFindNotification
} from '@modules/notifications/dtos'
import INotificationsRepository from '@modules/notifications/infra/typeorm/repositories/INotificationsRepository'
import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'

export default class FakeNotificationsRepository
  implements INotificationsRepository
{
  private notifications: Notification[] = []

  public async create({
    title,
    description,
    url,
    userId
  }: ICreateNotification): Promise<Notification> {
    const notification = new Notification()

    Object.assign(notification, {
      id: uuidV4(),
      title,
      description,
      url,
      userId,
      isReaded: false
    })

    this.notifications.push(notification)

    return notification
  }

  public async findById(id: string): Promise<Notification | undefined> {
    return this.notifications.find(notification => notification.id === id)
  }

  public async findAllByUserId(
    userId: string,
    options: IFindNotification = {}
  ): Promise<Notification[]> {
    const notifications = this.notifications.filter(
      notification => notification.userId === userId
    )

    if (!Object.keys(options).length) return notifications

    const limit = options.take ?? 5
    const offset = options.skip ?? 1

    return notifications.slice((offset - 1) * limit, offset * limit)
  }

  async findByTitleToday(_title: string): Promise<Notification | undefined> {
    return this.notifications[0]
  }

  public async save(notification: Notification): Promise<void> {
    const findIndex = this.notifications.findIndex(
      findNotification => findNotification.id === notification.id
    )

    this.notifications[findIndex] = notification
  }

  public async saveAllRead(userId: string): Promise<void> {
    this.notifications.forEach(n => {
      if (n.userId === userId) {
        n.isReaded = true
      }
    })
  }
}
