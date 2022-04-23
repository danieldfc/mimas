import 'reflect-metadata'

import { inject, injectable } from 'tsyringe'

import { Client } from '../infra/typeorm/entities/Client'

import IClientsRepository from '../infra/typeorm/repositories/IClientsRepository'

@injectable()
export class ListClientsService {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientsRepository
  ) {}

  async execute(): Promise<Client[]> {
    return this.clientRepository.findAll()
  }
}
