import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'

import { Notification } from '@modules/notifications/infra/typeorm/entities/Notification'

import INotificationsRepository from '@modules/notifications/infra/typeorm/repositories/INotificationsRepository'
import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'

type IRequestDTO = {
  userId: string
  take?: number
  skip?: number
}

@injectable()
export class LoadNotificationUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationRepository: INotificationsRepository
  ) {}

  async execute({ userId, take, skip }: IRequestDTO): Promise<Notification[]> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    return this.notificationRepository.findAllByUserId(userId, {
      take,
      skip
    })
  }
}
