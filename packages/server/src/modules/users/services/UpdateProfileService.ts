import { AppError } from '@shared/errors/AppError'
import { RemovePropertyObjectUndefinedOrNull } from '@shared/utils/RemovePropertyObjectUndefinedOrNull'
import { inject, injectable } from 'tsyringe'
import { User } from '../infra/typeorm/entities/User'
import IUsersRepository from '../infra/typeorm/repositories/IUsersRepository'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

type IRequest = {
  userId: string
  name?: string
  email?: string
  nick?: string
  oldPassword?: string
  password?: string
}

@injectable()
export class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private readonly userRepository: IUsersRepository,

    @inject('HashProvider')
    private readonly hashProvider: IHashProvider
  ) {}

  async execute({
    userId,
    name,
    nick,
    email,
    oldPassword,
    password
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('User not found')
    }

    const attributes = RemovePropertyObjectUndefinedOrNull.exec({
      name,
      nick,
      email,
      password,
      oldPassword
    }) as Omit<IRequest, 'userId'>

    if (attributes.email && user.email !== attributes.email) {
      const userWithUpdatedEmail = await this.userRepository.findByEmail(
        attributes.email
      )
      if (userWithUpdatedEmail) {
        throw new AppError('E-mail already in use.')
      }
    }

    if (attributes.password) {
      if (!attributes.oldPassword) {
        throw new AppError(
          'You need to inform the old password to set a new password.'
        )
      }
      const checkOldPassword = await this.hashProvider.compareHash(
        attributes.oldPassword,
        user.password
      )
      if (!checkOldPassword) {
        throw new AppError('Old password odes not match.')
      }
      attributes.password = await this.hashProvider.generateHash(
        attributes.password
      )
    }

    Object.assign(user, { ...attributes })

    await this.userRepository.save(user)

    return user
  }
}
