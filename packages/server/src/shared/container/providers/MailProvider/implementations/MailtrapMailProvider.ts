import mailConfig from '@config/mail'
import nodemailer, { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

@injectable()
export default class MailtrapMailProvider implements IMailProvider {
  private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    if (mailConfig?.mailtrap) {
      const {
        mailtrap: { host, user, pass, port }
      } = mailConfig
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: false,
        auth: user
          ? {
              user,
              pass
            }
          : undefined
      })

      this.client = transporter
    }
  }

  public async sendMail({
    to,
    from,
    subject,
    templateData
  }: ISendMailDTO): Promise<void> {
    this.client.sendMail({
      to: {
        name: to.name,
        address: to.email
      },
      from: {
        name: from?.name || 'Equipe Dacia Bordados',
        address: from?.email || 'equipe@daciabordados.com'
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })
  }
}
