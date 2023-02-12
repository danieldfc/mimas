import {
  ICreateNotification,
  IFindNotification
} from '@modules/notifications/dtos'
import { padStart } from '@shared/utils/StringUtil'
import { Repository, getRepository } from 'typeorm'
import { Notification } from '../entities/Notification'

import INotificationsRepository from './INotificationsRepository'

export default class NotificationsRepository
  implements INotificationsRepository
{
  private ormRepository: Repository<Notification>

  constructor() {
    this.ormRepository = getRepository(Notification)
  }

  public async create({
    title,
    description,
    url,
    userId
  }: ICreateNotification): Promise<Notification> {
    const customer = this.ormRepository.create({
      title,
      description,
      url,
      userId
    })

    await this.save(customer)

    return customer
  }

  public findById(id: string): Promise<Notification | undefined> {
    return this.ormRepository.findOne(id)
  }

  public async findAllByUserId(
    userId: string,
    options: IFindNotification = {}
  ): Promise<Notification[]> {
    return this.ormRepository.find({ where: { userId }, ...options })
  }

  public async findByTitleToday(
    title: string
  ): Promise<Notification | undefined> {
    const now = new Date()
    const month = padStart(String(now.getMonth() + 1), 2, '0')
    const day = padStart(String(now.getDate()), 2, '0')
    const dataComplete = `${now.getFullYear()}-${month}-${day}`

    return this.ormRepository.manager.query(
      `
        SELECT * FROM notifications WHERE title = $1 AND created_at::date = $2
      `,
      [title, dataComplete]
    )
  }

  async save(notification: Notification): Promise<void> {
    await this.ormRepository.save(notification)
  }
}
