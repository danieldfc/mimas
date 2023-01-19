import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { auth as authConfig } from '@config/index'
import { AppError } from '@shared/errors/AppError'
import UserTokensRepository from '../../typeorm/repositories/UserTokensRepository'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default async function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization
  const userTokensRepository = new UserTokensRepository()

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secretRefreshToken)
    const { sub: userId } = decoded as ITokenPayload

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      userId,
      token
    )

    if (!user) {
      throw new AppError('User not found', 401)
    }

    request.user = {
      id: userId
    }

    return next()
  } catch (err) {
    console.log(err)
    throw new AppError('Invalid JWT token', 401)
  }
}
