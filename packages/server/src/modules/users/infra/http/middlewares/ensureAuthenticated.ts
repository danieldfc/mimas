import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { auth as authConfig } from '@config/index'
import { AppError } from '@shared/errors/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default async function ensureAuthenticated(
  request: Request,
  _: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub: userId } = decoded as ITokenPayload

    request.user = {
      id: userId
    }

    return next()
  } catch (err) {
    console.log(err)
    throw new AppError('Invalid JWT token', 401)
  }
}
