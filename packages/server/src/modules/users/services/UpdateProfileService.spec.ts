import { AppError } from '@shared/errors/AppError'
import { User } from '../infra/typeorm/entities/User'
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository'
import { UpdateProfileService } from './UpdateProfileService'

let fakeUsersRepository: FakeUsersRepository
let updateProfileService: UpdateProfileService

describe('UpdateService', () => {
  let user: User

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    updateProfileService = new UpdateProfileService(fakeUsersRepository)

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      nick: 'john',
      email: 'johndoe@example.com',
      password: '123456'
    })
  })

  it('should be able to update email user existing', async () => {
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
})
