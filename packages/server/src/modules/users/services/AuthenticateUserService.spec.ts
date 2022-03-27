import { AppError } from '@shared/errors/AppError'

import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository'

import { AuthenticateUserService } from './AuthenticateUserService'

let fakeUsersRepository: FakeUsersRepository
let authenticateUserService: AuthenticateUserService

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    authenticateUserService = new AuthenticateUserService(fakeUsersRepository)
  })

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      nick: 'john',
      email: 'johndoe@example.com',
      password: '123456'
    })

    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456'
    })

    expect(response).toHaveProperty('token')
    expect(response.user).toEqual(user)
  })

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: '123456'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'John Doe',
      nick: 'john',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
