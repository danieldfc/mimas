import { AppError } from '@shared/errors/AppError'
import { RemovePropertyObjectUndefinedOrNull } from '@shared/utils/RemovePropertyObjectUndefinedOrNull'
import { inject, injectable } from 'tsyringe'
import { User } from '../infra/typeorm/entities/User'
import IUsersRepository from '../infra/typeorm/repositories/IUsersRepository'

type IRequest = {
  userId: string
  name?: string
  email?: string
  nick?: string
}

@injectable()
export class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository
  ) {}

  async execute({ userId, name, nick, email }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    const attributes = RemovePropertyObjectUndefinedOrNull.exec({
      name,
      nick,
      email
    })

    Object.assign(user, { ...attributes })

    await this.userRepository.save(user)

    return user
  }
}
