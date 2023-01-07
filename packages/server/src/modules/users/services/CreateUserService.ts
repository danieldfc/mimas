import { inject, injectable } from 'tsyringe'

import { AppError } from '@shared/errors/AppError'
import { User } from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos'
import IHashProvider from '../providers/HashProvider/models/IHashProvider'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  async execute({
    email,
    password,
    nick,
    name
  }: ICreateUserDTO): Promise<User> {
    const userExist = await this.userRepository.findByEmail(email)

    if (userExist) {
      throw new AppError('User already exists')
    }

    const hashPassword = await this.hashProvider.generateHash(password)

    return this.userRepository.create({
      email,
      nick,
      name,
      password: hashPassword
    })
  }
}
