// import { AppError } from '@shared/errors/AppError'

import { User } from '@modules/users/infra/typeorm/entities/User'

import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository'
import FakeNotificationsRepository from '@modules/notifications/infra/typeorm/repositories/fakes/FakeNotificationRepository'

import { LoadNotificationUserService } from './LoadNotificationUserService'
import { AppError } from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let loadNotificationUserService: LoadNotificationUserService

describe('LoadNotificationUser', () => {
  let user: User
  let otherUser: User

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeNotificationsRepository = new FakeNotificationsRepository()
    loadNotificationUserService = new LoadNotificationUserService(
      fakeUsersRepository,
      fakeNotificationsRepository
    )

    user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      nick: 'johndoe',
      password: '123456'
    })
    otherUser = await fakeUsersRepository.create({
      name: 'Rafael Mello',
      email: 'rafaelmello@email.com',
      nick: 'rafaelmello',
      password: '123456'
    })
  })

  it('should be able to load notifications with user associated', async () => {
    await fakeNotificationsRepository.create({
      title: 'My notification',
      userId: user.id
    })

    const notifications = await loadNotificationUserService.execute({
      userId: user.id
    })

    expect(notifications).toEqual(
      expect.arrayContaining([
        {
          id: expect.anything(),
          title: 'My notification',
          userId: user.id,
          isReaded: false
        }
      ])
    )
  })

  it('should not be able to load notifications without id user correctelly', async () => {
    await fakeNotificationsRepository.create({
      title: 'My notification',
      userId: user.id
    })

    await expect(
      loadNotificationUserService.execute({
        userId: 'non-id-user'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should be able to load notifications to only one user', async () => {
    await fakeNotificationsRepository.create({
      title: 'My notification',
      userId: user.id
    })

    const notifications = await loadNotificationUserService.execute({
      userId: otherUser.id
    })

    expect(notifications).toEqual([])
  })
})
