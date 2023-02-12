import { container } from 'tsyringe'

import IMailProvider from './MailProvider/models/IMailProvider'
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider'
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandlebarsMailTemplateProvider'
import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider'
import ICronJobProvider from './CronJobProvider/models/ICronJobProvider'
import CronJobProvider from './CronJobProvider/implementations/CronJobProvider'

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider
)

container.registerInstance<IMailProvider>(
  'MailProvider',
  container.resolve(EtherealMailProvider)
)

container.registerSingleton<ICronJobProvider>(
  'CronJobProvider',
  CronJobProvider
)
