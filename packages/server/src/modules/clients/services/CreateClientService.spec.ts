import { AppError } from '@shared/errors/AppError'

import { CreateClientService } from './CreateClientService'
import FakeClientsRepository from '../infra/typeorm/repositories/fakes/FakeClientsRepository'

let fakeClientsRepository: FakeClientsRepository
let createClientService: CreateClientService

describe('CreateClient', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository()
    createClientService = new CreateClientService(fakeClientsRepository)
  })

  it('should be able to create a new client', async () => {
    const client = await createClientService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+5583999999999'
    })

    expect(client).toHaveProperty('id')
  })

  it('should not be able to create a new client with same email another', async () => {
    const client = await createClientService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '+5583999999999'
    })

    expect(client).toHaveProperty('id')

    await expect(
      createClientService.execute({
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+5583999999999'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
