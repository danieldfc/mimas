import { AppError } from '@shared/errors/AppError'
import { User } from '../infra/typeorm/entities/User'
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository'
import { ShowProfileService } from './ShowProfileService'

let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('ShowProfile', () => {
  let user: User

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    showProfileService = new ShowProfileService(fakeUsersRepository)

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      nick: 'john',
      email: 'johndoe@example.com',
      password: '123456'
    })
  })

  it('should be able to show the profile', async () => {
    const showUser = await showProfileService.execute({
      userId: user.id
    })

    expect(showUser).toHaveProperty('id')
    expect(showUser.id).toBe(user.id)
  })

  it('should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        userId: 'non-exinsting-user-id'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
