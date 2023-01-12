import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClient'
import { FindManyOptions, Repository, getRepository } from 'typeorm'
import { Client } from '../entities/Client'
import IClientsRepository from './IClientsRepository'

export default class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>

  constructor() {
    this.ormRepository = getRepository(Client)
  }

  public async create({
    name,
    address,
    email,
    phone
  }: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
      name,
      address,
      email,
      phone
    })

    await this.save(client)

    return client
  }

  public async findAll(
    options: FindManyOptions<Client> = {}
  ): Promise<Client[]> {
    return this.ormRepository.find(options)
  }

  public async findById(clientId: string): Promise<Client | undefined> {
    return this.ormRepository.findOne({
      where: { id: clientId }
    })
  }

  public async findByName(name: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      where: { name }
    })

    return client
  }

  public async save(client: Client): Promise<void> {
    await this.ormRepository.save(client)
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
