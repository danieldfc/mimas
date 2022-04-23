import FakeClientsRepository from '../infra/typeorm/repositories/fakes/FakeClientsRepository'
import { ListClientsService } from './ListClientsService'

let fakeClientsRepository: FakeClientsRepository
let listClientService: ListClientsService

describe('ListClients', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository()
    listClientService = new ListClientsService(fakeClientsRepository)
  })

  it('should be able to list clients', async () => {
    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      phone: '+5583999999999',
      address: 'Address',
      email: 'johndoe@example.com'
    })

    const clients = await listClientService.execute()

    expect(clients).toEqual(expect.arrayContaining([client]))
  })
})
