import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { auth as authConfig } from '@config/index'
import { AppError } from '@shared/errors/AppError'

interface ITokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = verify(token, authConfig.jwt.secret)
    const { sub } = decoded as ITokenPayload

    request.user = {
      id: sub
    }

    return next()
  } catch (err) {
    throw new AppError('Invalid JWT token', 401)
  }
}
