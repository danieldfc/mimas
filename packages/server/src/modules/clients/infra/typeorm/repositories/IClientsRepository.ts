import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClient'
import { FindManyOptions } from 'typeorm'
import { Client } from '../entities/Client'

export default interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>
  findAll(options?: FindManyOptions<Client>): Promise<Client[]>
  findById(clientId: string): Promise<Client | undefined>
  findByName(name: string): Promise<Client | undefined>
  save(client: Client): Promise<void>
  delete(id: string): Promise<void>
}
