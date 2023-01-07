import { AppError } from '@shared/errors/AppError'
import { User } from '../infra/typeorm/entities/User'
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import { UpdateProfileService } from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfileService: UpdateProfileService

describe('UpdateProfile', () => {
  let user: User

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      nick: 'john',
      email: 'johndoe@example.com',
      password: '123456'
    })
  })

  it('should be able to update the profile', async () => {
    const email = 'johndoeemail@example.com'
    const profileUpdate = await updateProfileService.execute({
      userId: user.id,
      email
    })

    expect(profileUpdate).toHaveProperty('id')
    expect(profileUpdate.id).toBe(user.id)
    expect(profileUpdate.email).toBe(email)
  })

  it('should not be able to update user not existing', async () => {
    await expect(
      updateProfileService.execute({
        userId: 'non-id',
        email: 'johndoeemail@example.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to change to another user email', async () => {
    const userTre = await fakeUsersRepository.create({
      name: 'John Trê',
      nick: 'johntre',
      email: 'johntre@example.com',
      password: '123456'
    })

    await expect(
      updateProfileService.execute({
        userId: userTre.id,
        email: user.email
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to update the password', async () => {
    const password = '123123'
    const profileUpdate = await updateProfileService.execute({
      userId: user.id,
      oldPassword: '123456',
      password
    })

    expect(profileUpdate).toHaveProperty('id')
    expect(profileUpdate.id).toBe(user.id)
    expect(profileUpdate.password).toBe(password)
  })

  it('should not be able to update the password without old password', async () => {
    await expect(
      updateProfileService.execute({
        userId: user.id,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update the password with wrong old password', async () => {
    await expect(
      updateProfileService.execute({
        userId: user.id,
        oldPassword: 'wrong-old-password',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
