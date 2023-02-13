import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import INotificationsRepository from '@modules/notifications/infra/typeorm/repositories/INotificationsRepository'
import { Notification } from '../infra/typeorm/entities/Notification'

type IRequestDTO = {
  id: string
  userId: string
}

@injectable()
export class ReadNotificationUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationRepository: INotificationsRepository
  ) {}

  async execute({ id, userId }: IRequestDTO): Promise<Notification> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    const notification = await this.notificationRepository.findById(id)

    if (!notification) {
      throw new AppError('Notification not found', 404)
    }

    notification.isReaded = true

    await this.notificationRepository.save(notification)

    return notification
  }
}
