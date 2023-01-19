import { AppError } from '@shared/errors/AppError'
import { generateString } from '@shared/utils/StringUtil'
import jwt from 'jsonwebtoken'
import { User } from '../infra/typeorm/entities/User'
import { UserToken } from '../infra/typeorm/entities/UserToken'
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository'
import FakeUserTokensRepository from '../infra/typeorm/repositories/fakes/FakeUserTokensRepository'
import { RefreshTokenService } from './RefreshTokenService'

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let refreshTokenService: RefreshTokenService

describe('RefreshToken', () => {
  let user: User
  let userToken: UserToken
  const expiresDate: Date = new Date()
  const amountDays = 3

  expiresDate.setDate(expiresDate.getDate() + amountDays)

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeUserTokensRepository = new FakeUserTokensRepository()

    refreshTokenService = new RefreshTokenService(
      fakeUsersRepository,
      fakeUserTokensRepository
    )

    user = await fakeUsersRepository.create({
      name: 'John Doe',
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

  it('should be able to refresh token', async () => {
    const verifySpy = jest.spyOn(jwt, 'verify').mockImplementation(() => {
      return { sub: user.id, email: user.email }
    })

    const signSpy = jest.spyOn(jwt, 'sign').mockImplementation(() => {
      return generateString(30)
    })

    const refreshTokenUpdated = await refreshTokenService.execute({
      refreshToken: userToken.refreshToken
    })

    expect(signSpy).toBeCalled()
    expect(verifySpy).toBeCalled()
    expect(refreshTokenUpdated).toBeTruthy()
  })

  it('should not be able to refresh token inexists', async () => {
    jest.spyOn(jwt, 'verify').mockImplementation(() => {
      return { sub: user.id, email: user.email }
    })

    await expect(
      refreshTokenService.execute({
        refreshToken: 'non-refresh-token'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
