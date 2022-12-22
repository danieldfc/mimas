import { ICreateClientDTO } from '@modules/clients/dtos/ICreateClient'
import { Repository, getRepository } from 'typeorm'
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

  public async findAll(): Promise<Client[]> {
    return this.ormRepository.find()
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
}
