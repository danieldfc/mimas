import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'

import { Notification } from '@modules/users/infra/typeorm/entities/Notification'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import INotificationsRepository from '@modules/users/infra/typeorm/repositories/INotificationsRepository'

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
