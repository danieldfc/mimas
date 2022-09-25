import { hash } from 'bcrypt'
import { v4 as uuidV4 } from 'uuid'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import { ICreateUserDTO } from '@modules/users/dtos'

import { User } from '@modules/users/infra/typeorm/entities/User'

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = []

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id)
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email)
  }

  public async create({
    name,
    email,
    password,
    nick
  }: ICreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, {
      id: uuidV4(),
      name,
      email,
      password: await hash(password, 10),
      nick
    })

    this.users.push(user)

    return user
  }

  public async save(user: User): Promise<void> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id)

    this.users[findIndex] = user
  }
}

export default FakeUsersRepository
