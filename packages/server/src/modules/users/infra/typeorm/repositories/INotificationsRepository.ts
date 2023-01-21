import { ICreateNotification, IFindNotification } from '@modules/users/dtos'

import { Notification } from '../entities/Notification'

export default interface INotificationsRepository {
  create(data: ICreateNotification): Promise<Notification>
  findAllByUserId(
    userId: string,
    options: IFindNotification
  ): Promise<Notification[]>
  findById(id: string): Promise<Notification | undefined>
  save(notification: Notification): Promise<void>
}
