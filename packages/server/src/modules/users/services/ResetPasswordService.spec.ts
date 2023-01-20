import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { generateString } from '@shared/utils/StringUtil'
import { User } from '../infra/typeorm/entities/User'
import { UserToken } from '../infra/typeorm/entities/UserToken'
import FakeUserTokensRepository from '../infra/typeorm/repositories/fakes/FakeUserTokensRepository'
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider'
import { ResetPasswordService } from './ResetPasswordService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeHashProvider: FakeHashProvider
let resetPassword: ResetPasswordService

describe('ResetPassword', () => {
  let user: User
  let userToken: UserToken
  const expiresDate: Date = new Date()
  const amountDays = 3

  expiresDate.setDate(expiresDate.getDate() + amountDays)

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    fakeHashProvider = new FakeHashProvider()
    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider
    )

    user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password: '123456',
      nick: 'jonhdoe'
    })
    userToken = await fakeUserTokensRepository.generate({
      userId: user.id,
      expiresDate,
      refreshToken: generateString(30)
    })
  })

  it('should be able to reset the password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash')

    await resetPassword.execute({
      password: '123123',
      token: userToken.refreshToken
    })

    const userModify = await fakeUsersRepository.findById(user.id)

    expect(generateHash).toHaveBeenCalledWith('123123')
    expect(userModify?.password).toBe('123123')
  })

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset the password with non-existing user', async () => {
    const { refreshToken } = await fakeUserTokensRepository.generate({
      userId: 'non-existing-user',
      expiresDate,
      refreshToken: generateString(30)
    })

    await expect(
      resetPassword.execute({
        token: refreshToken,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to reset password if passed more than 2 hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date()
      return customDate.setHours(customDate.getHours() + 3)
    })

    await expect(
      resetPassword.execute({
        token: userToken.refreshToken,
        password: '123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
