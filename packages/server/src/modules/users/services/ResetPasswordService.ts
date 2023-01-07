import { inject, injectable } from 'tsyringe'
import { addHours, isAfter } from 'date-fns'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import IUserTokensRepository from '../infra/typeorm/repositories/IUserTokensRepository'
import { AppError } from '@shared/errors/AppError'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

type IRequestDTO = {
  password: string
  token: string
}

@injectable()
export class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({ password, token }: IRequestDTO): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token)

    if (!userToken) {
      throw new AppError('User token does not exists')
    }

    const user = await this.userRepository.findById(userToken.userId)

    if (!user) {
      throw new AppError('User does not exists')
    }

    const tokenCreatedAt = userToken.createdAt
    const compareDate = addHours(tokenCreatedAt, 2)

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    user.password = await this.hashProvider.generateHash(password)

    await this.userRepository.save(user)
  }
}
