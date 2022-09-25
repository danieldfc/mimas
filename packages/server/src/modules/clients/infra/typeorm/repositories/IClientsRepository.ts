import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClient'
import { Client } from '../entities/Client'

export default interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>
  findAll(): Promise<Client[]>
  findById(clientId: string): Promise<Client | undefined>
  findByName(name: string): Promise<Client | undefined>
  save(client: Client): Promise<void>
}
