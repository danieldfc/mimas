import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import INotificationsRepository from '@modules/notifications/infra/typeorm/repositories/INotificationsRepository'

type IRequestDTO = {
  userId: string
}

@injectable()
export class ReadAllNotificationUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationRepository: INotificationsRepository
  ) {}

  async execute({ userId }: IRequestDTO): Promise<void> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found', 404)
    }

    await this.notificationRepository.saveAllRead(user.id)
  }
}
