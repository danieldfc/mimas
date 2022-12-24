import { Repository, getRepository } from 'typeorm'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos'

import { User } from '../entities/User'

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User)
  }

  public async create({
    email,
    name,
    nick,
    password
  }: ICreateUserDTO): Promise<User> {
    const customer = this.ormRepository.create({
      name,
      email,
      nick,
      password
    })

    await this.save(customer)

    return customer
  }

  public findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id)
  }

  public findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: {
        email
      }
    })
  }

  async save(user: User): Promise<void> {
    await this.ormRepository.save(user)
  }
}
