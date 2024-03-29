import { container } from 'tsyringe'
import INotificationsRepository from '@modules/notifications/infra/typeorm/repositories/INotificationsRepository'
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
)
