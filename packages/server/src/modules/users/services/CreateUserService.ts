import { inject, injectable } from 'tsyringe'
import { hash } from 'bcrypt'

import { AppError } from '@shared/errors/AppError'
import { User } from '@modules/users/infra/typeorm/entities/User'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos'

@injectable()
export class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
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

    const hashPassword = await hash(password, 10)

    const user = await this.userRepository.create({
      email,
      nick,
      name,
      password: hashPassword
    })

    return user
  }
}
