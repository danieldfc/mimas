import { container } from 'tsyringe'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import IUserTokensRepository from '@modules/users/infra/typeorm/repositories/IUserTokensRepository'

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'
import IHashProvider from './HashProvider/models/IHashProvider'
import INotificationsRepository from '../infra/typeorm/repositories/INotificationsRepository'
import NotificationsRepository from '../infra/typeorm/repositories/NotificationsRepository'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
)

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
