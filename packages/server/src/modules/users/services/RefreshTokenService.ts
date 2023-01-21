import { inject, injectable } from 'tsyringe'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import IUserTokensRepository from '../infra/typeorm/repositories/IUserTokensRepository'
import { sign, verify } from 'jsonwebtoken'
import { auth } from '@config/auth'
import { AppError } from '@shared/errors/AppError'
import { addDays } from 'date-fns'

type IRequestDTO = {
  refreshToken: string
}

type IResponseDTO = {
  token: string
  refreshToken: string
}

type IPayload = {
  sub: string
  email: string
}

@injectable()
export class RefreshTokenService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository
  ) {}

  async execute({ refreshToken }: IRequestDTO): Promise<IResponseDTO> {
    const {
      secretRefreshToken,
      expiresInRefreshToken,
      expiresInRefreshTokenDays,
      secret,
      expiresIn
    } = auth.jwt
    const { sub: userId, email } = verify(
      refreshToken,
      secretRefreshToken
    ) as IPayload

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        userId,
        refreshToken
      )

    if (!userToken) {
      throw new AppError('Refresh token not found!')
    }

    await this.userTokensRepository.destroy(userToken.id)

    const refreshTokenUpdated = sign({ email }, secretRefreshToken, {
      subject: userId,
      expiresIn: expiresInRefreshToken
    })

    await this.userTokensRepository.generate({
      userId,
      expiresDate: addDays(Date.now(), expiresInRefreshTokenDays),
      refreshToken: refreshTokenUpdated
    })

    const newToken = sign({}, secret, {
      subject: userId,
      expiresIn
    })

    return {
      token: newToken,
      refreshToken
    }
  }
}
