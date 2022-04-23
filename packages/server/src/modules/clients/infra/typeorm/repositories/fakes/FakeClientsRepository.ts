import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClient'
import { randomUUID } from 'crypto'
import { Client } from '../../entities/Client'
import IClientsRepository from '../IClientsRepository'

export default class FakeClientsRepository implements IClientsRepository {
  private clients: Client[] = []

  public async create({
    name,
    address,
    email,
    phone
  }: ICreateClientDTO): Promise<Client> {
    const client = new Client()

    Object.assign(client, {
      id: randomUUID(),
      name,
      address,
      email,
      phone
    })

    this.clients.push(client)

    return client
  }

  public async findByName(name: string): Promise<Client | undefined> {
    const client = this.clients.find(client => client.name === name)

    return client
  }

  public async save(client: Client): Promise<void> {
    const findIndex = this.clients.findIndex(
      findClient => findClient.id === client.id
    )

    this.clients[findIndex] = client
  }
}
