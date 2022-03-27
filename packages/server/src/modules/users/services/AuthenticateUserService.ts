import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { auth as authConfig } from '@config/index'

import { User } from '../infra/typeorm/entities/User'
import IUsersRepository from '../infra/typeorm/repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponseDTO {
  user: User
  token: string
}

@injectable()
export class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return { user, token }
  }
}