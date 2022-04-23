import 'reflect-metadata'

import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

import { ICreateClientDTO } from '../dtos/ICreateClient'
import { Client } from '../infra/typeorm/entities/Client'

import IClientsRepository from '../infra/typeorm/repositories/IClientsRepository'

@injectable()
export class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientsRepository
  ) {}

  async execute({
    email,
    address,
    phone,
    name
  }: ICreateClientDTO): Promise<Client> {
    const clientExist = await this.clientRepository.findByName(name)

    if (clientExist) {
      throw new AppError('Client already exists')
    }

    const client = await this.clientRepository.create({
      email,
      address,
      name,
      phone
    })

    return client
  }
}
