import { AppError } from '@shared/errors/AppError'
import FakeClientsRepository from '../infra/typeorm/repositories/fakes/FakeClientsRepository'
import { DeleteClientService } from './DeleteClientService'

let fakeClientsRepository: FakeClientsRepository
let deleteClientService: DeleteClientService

describe('DeleteClient', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository()
    deleteClientService = new DeleteClientService(fakeClientsRepository)
  })

  it('should be able to update client', async () => {
    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999',
      address: 'Address',
      email: 'johndoe@example.com'
    })

    await deleteClientService.execute({
      clientId: client.id
    })

    const clientDeleted = await fakeClientsRepository.findById(client.id)

    expect(clientDeleted).toBe(undefined)
  })

  it('should not be able to update client inexists', async () => {
    await expect(
      deleteClientService.execute({
        clientId: 'non-id-client'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
