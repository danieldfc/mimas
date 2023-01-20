import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { auth as authConfig } from '@config/index'

import { User } from '../infra/typeorm/entities/User'
import IUsersRepository from '../infra/typeorm/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'
import IUserTokensRepository from '../infra/typeorm/repositories/IUserTokensRepository'
import { addDays } from 'date-fns'

interface IRequest {
  email: string
  password: string
}

interface IResponseDTO {
  user: User
  token: string
  refreshToken: string
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const {
      secret,
      expiresIn,
      secretRefreshToken,
      expiresInRefreshToken,
      expiresInRefreshTokenDays
    } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    const refreshToken = sign({ email: user.email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken
    })

    await this.userTokensRepository.generate({
      userId: user.id,
      expiresDate: addDays(Date.now(), expiresInRefreshTokenDays),
      refreshToken
    })

    return { user, token, refreshToken }
  }
}
