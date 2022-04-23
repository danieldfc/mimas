import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClient'
import { Client } from '../entities/Client'

export default interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>
  findByName(name: string): Promise<Client | undefined>
  save(client: Client): Promise<void>
}
