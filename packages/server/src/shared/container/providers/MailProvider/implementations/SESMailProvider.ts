// import { Transporter } from 'nodemailer'
import { inject, injectable } from 'tsyringe'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider'
import ISendMailDTO from '../dtos/ISendMailDTO'
import IMailProvider from '../models/IMailProvider'

@injectable()
export default class SesMailProvider implements IMailProvider {
  // private client: Transporter

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {}

  public async sendMail(_data: ISendMailDTO): Promise<void> {} // eslint-disable-line
}
