import { AppError } from '@shared/errors/AppError'

import { inject, injectable } from 'tsyringe'

import IClientsRepository from '../infra/typeorm/repositories/IClientsRepository'

type IRequestDTO = {
  clientId: string
}

@injectable()
export class DeleteClientService {
  constructor(
    @inject('ClientsRepository')
    private clientRepository: IClientsRepository
  ) {}

  async execute({ clientId }: IRequestDTO): Promise<void> {
    const client = await this.clientRepository.findById(clientId)

    if (!client) {
      throw new AppError('Client not found')
    }

    await this.clientRepository.delete(client.id)
  }
}
