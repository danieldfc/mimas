import {
  ICreateNotification,
  IFindNotification
} from '@modules/notifications/dtos'

import { Notification } from '../entities/Notification'

export default interface INotificationsRepository {
  create(data: ICreateNotification): Promise<Notification>
  findAllByUserId(
    userId: string,
    options?: IFindNotification
  ): Promise<Notification[]>
  findByTitleToday(title: string): Promise<Notification | undefined>
  findById(id: string): Promise<Notification | undefined>
  save(notification: Notification): Promise<void>
}
