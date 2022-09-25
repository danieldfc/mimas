import { AppError } from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository'
import { CreateUserService } from './CreateUserService'

let fakeUsersRepository: FakeUsersRepository
let createUserService: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    createUserService = new CreateUserService(fakeUsersRepository)
  })

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      nick: 'john',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')
  })

  it('should not be able to create a new user with same email another', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      nick: 'john',
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(user).toHaveProperty('id')

    await expect(
      createUserService.execute({
        name: 'John Doe',
        nick: 'john',
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
