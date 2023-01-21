import { ICreateNotification, IFindNotification } from '@modules/users/dtos'
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

  async save(notification: Notification): Promise<void> {
    await this.ormRepository.save(notification)
  }
}
