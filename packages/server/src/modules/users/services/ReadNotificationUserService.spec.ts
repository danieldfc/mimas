import { AppError } from '@shared/errors/AppError'

import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository'

import FakeNotificationsRepository from '../infra/typeorm/repositories/fakes/FakeNotificationRepository'

import { User } from '../infra/typeorm/entities/User'

import { ReadNotificationUserService } from './ReadNotificationUserService'

let fakeUsersRepository: FakeUsersRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let readNotificationUserService: ReadNotificationUserService

describe('ReadNotificationUser', () => {
  let user: User

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    readNotificationUserService = new ReadNotificationUserService(
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

  it('should be able to read notification of user', async () => {
    const notification = await fakeNotificationsRepository.create({
      title: 'My notification',
      userId: user.id
    })

    await readNotificationUserService.execute({
      id: notification.id,
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

  it('should not be able to read notification to user inexists', async () => {
    const notification = await fakeNotificationsRepository.create({
      title: 'My notification',
      userId: user.id
    })

    await expect(
      readNotificationUserService.execute({
        id: notification.id,
        userId: 'non-id-user'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to read notification inexists', async () => {
    await expect(
      readNotificationUserService.execute({
        id: 'non-notification-id',
        userId: user.id
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
