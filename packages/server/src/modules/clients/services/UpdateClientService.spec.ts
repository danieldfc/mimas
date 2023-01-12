import { AppError } from '@shared/errors/AppError'
import FakeClientsRepository from '../infra/typeorm/repositories/fakes/FakeClientsRepository'
import { UpdateClientService } from './UpdateClientService'

let fakeClientsRepository: FakeClientsRepository
let updateClientService: UpdateClientService

describe('UpdateClient', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository()
    updateClientService = new UpdateClientService(fakeClientsRepository)
  })

  it('should be able to update client', async () => {
    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999',
      address: 'Address',
      email: 'johndoe@example.com'
    })

    const clientUpdate = await updateClientService.execute({
      clientId: client.id,
      name: 'Nome atualizado'
    })

    expect(clientUpdate.name).toEqual('Nome atualizado')
  })

  it('should not be able to update client inexists', async () => {
    await expect(
      updateClientService.execute({
        clientId: 'non-id-client',
        name: 'Nome atualizado'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
