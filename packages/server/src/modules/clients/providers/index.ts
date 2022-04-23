import { container } from 'tsyringe'

import IClientsRepository from '@modules/clients/infra/typeorm/repositories/IClientsRepository'
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository'

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository
)
