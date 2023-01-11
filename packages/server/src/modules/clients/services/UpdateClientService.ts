import { AppError } from '@shared/errors/AppError'
import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'

import { Client } from '../infra/typeorm/entities/Client'

import IClientsRepository from '../infra/typeorm/repositories/IClientsRepository'

type IRequestDTO = {
  clientId: string
  name?: string
  email?: string
  phone?: string
  address?: string
}

@injectable()
export class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientsRepository
  ) {}

  async execute({
    clientId,
    name,
    email,
    phone,
    address
  }: IRequestDTO): Promise<Client> {
    const client = await this.clientRepository.findById(clientId)

    if (!client) {
      throw new AppError('Client not found')
    }

    Object.assign(client, {
      name,
      email,
      phone,
      address
    })

    await this.clientRepository.save(client)

    return client
  }
}
