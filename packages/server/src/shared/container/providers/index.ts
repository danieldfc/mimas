import { container } from 'tsyringe'

import mailConfig from '@config/mail'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import MailtrapMailProvider from './MailProvider/implementations/MailtrapMailProvider'
import SESMailProvider from './MailProvider/implementations/SESMailProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)

const registerMail = {
  ethereal: container.resolve(EtherealMailProvider),
  mailtrap: container.resolve(MailtrapMailProvider),
  ses: container.resolve(SESMailProvider)
}

container.registerInstance<IMailProvider>(
  'MailProvider',
  registerMail[mailConfig.driver]
)
