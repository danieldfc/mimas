import jwt from 'jsonwebtoken'
import FakeUsersRepository from '@modules/users/infra/typeorm/repositories/fakes/FakeUsersRepository'
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider'
import { AppError } from '@shared/errors/AppError'
import { User } from '../infra/typeorm/entities/User'
import FakeUserTokensRepository from '../infra/typeorm/repositories/fakes/FakeUserTokensRepository'
import { SendForgotPasswordEmailService } from './SendForgotPasswordEmailService'
import { generateString } from '@shared/utils/StringUtil'

let fakeUsersRepository: FakeUsersRepository
let fakeMailProvider: FakeMailProvider
let fakeUserTokensRepository: FakeUserTokensRepository
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe('SendForgotPasswordEmail', () => {
  let user: User

  beforeEach(async () => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository()
    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider
    )

    user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@example.com',
      password: '123456',
      nick: 'jonhdoe'
    })
  })

  it('should be able to recover the password using the e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail')

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })

    expect(sendMail).toHaveBeenCalled()
  })

  it('should not be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'non-existingemail@email.com'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should generate a forgot password token', async () => {
    const token = generateString(30)

    const signSpy = jest.spyOn(jwt, 'sign').mockImplementation(() => {
      return token
    })

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate')

    await sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })

    expect(signSpy).toBeCalled()
    expect(generateToken).toBeCalledWith({
      userId: user.id,
      expiresDate: expect.anything(),
      refreshToken: token
    })
  })
})
