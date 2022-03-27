import { randomUUID } from 'crypto'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos'

import { User } from '@modules/users/infra/typeorm/entities/User'

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id)

    return findUser
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email)

    return findUser
  }

  public async create({
    name,
    email,
    password
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: randomUUID(), name, email, password })

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user
  }
}

export default FakeUsersRepository
