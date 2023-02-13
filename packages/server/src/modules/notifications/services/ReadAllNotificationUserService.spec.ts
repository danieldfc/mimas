import { AppError } from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository'
import FakeNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationRepository'

import { User } from '@modules/users/infra/typeorm/entities/User'

import { ReadAllNotificationUserService } from './ReadAllNotificationUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let readAllNotificationUserService: ReadAllNotificationUserService

describe('ReadAllNotificationUser', () => {
  let user: User

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    readAllNotificationUserService = new ReadAllNotificationUserService(
      fakeUsersRepository,
      fakeNotificationsRepository
    )

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      nick: 'johndoe',
      password: '123456'
    })
  })

  it('should be able to read all notification of user', async () => {
    await fakeNotificationsRepository.create({
      title: 'My notification',
      userId: user.id
    })

    await readAllNotificationUserService.execute({
      userId: user.id
    })

    const notifications = await fakeNotificationsRepository.findAllByUserId(
      user.id
    )

    expect(notifications).toEqual(
      expect.arrayContaining([
        {
          id: expect.anything(),
          title: 'My notification',
          userId: user.id,
          isReaded: true
        }
      ])
    )
  })

  it('should not be able to read notification to user inexist', async () => {
    await expect(
      readAllNotificationUserService.execute({
        userId: 'non-id-user'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
