import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { prismaClient } from '@database/index'
import { AppError } from 'src/infra/errors/AppError'

interface IRequest {
  name?: string
  nick: string
  password: string
  email: string
}

export class CreateUserService {
  async execute(data: IRequest): Promise<User> {
    if (!data.password || data.password.length < 6) {
      throw new AppError('Is necessary to your security a password high!')
    }

    if (!data.email) {
      throw new AppError('Add email to your account!')
    }

    const userExist = await prismaClient.user.findFirst({
      where: { email: data.email }
    })

    if (userExist) {
      throw new AppError('User already exists')
    }

    const hashPasssword = await hash(data.password, 10)

    return prismaClient.user.create({
      data: {
        ...data,
        password: hashPasssword
      }
    })
  }
}
