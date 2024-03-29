import { User } from '../entities/User'

import { ICreateUserDTO } from '@modules/users/dtos'

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  save(user: User): Promise<void>
}
