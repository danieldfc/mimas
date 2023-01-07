import { container } from 'tsyringe'

import IUsersRepository from '@modules/users/infra/typeorm/repositories/IUsersRepository'
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'

import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository'
import IUserTokensRepository from '@modules/users/infra/typeorm/repositories/IUserTokensRepository'

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider'
import IHashProvider from './HashProvider/models/IHashProvider'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
)

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
)

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
