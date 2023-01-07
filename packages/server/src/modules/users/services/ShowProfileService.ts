import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { User } from '../infra/typeorm/entities/User'
import IUsersRepository from '../infra/typeorm/repositories/IUsersRepository'

type IRequest = {
  userId: string
}

@injectable()
export class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository
  ) {}

  async execute({ userId }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    return user
  }
}
