import { inject, injectable } from 'tsyringe'
import { resolve } from 'path'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import { AppError } from '@shared/errors/AppError'
import IUserTokensRepository from '../infra/typeorm/repositories/IUserTokensRepository'

type IRequestDTO = {
  email: string
}

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new AppError('User does not exists.')
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    const forgotPasswordTemplate = resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs'
    )

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[Aldaciosa] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${process.env.APP_WEB}/reset_password?token=${token}`
        }
      }
    })
  }
}
