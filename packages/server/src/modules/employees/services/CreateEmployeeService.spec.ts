import { AppError } from '@shared/errors/AppError'
import { TypePix } from '@shared/utils'
import FakeEmployeesRepository from '../infra/typeorm/repositories/fakes/FakeEmployeesRepository'
import { CreateEmployeeService } from './CreateEmployeeService'

let fakeEmployeesRepository: FakeEmployeesRepository
let createEmployeeService: CreateEmployeeService

describe('CreateEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()

    createEmployeeService = new CreateEmployeeService(fakeEmployeesRepository)
  })

  it('should be able to create employee', async () => {
    const employee = await createEmployeeService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '83999999999',
      typePix: TypePix.RANDOM,
      keyPix: '123123123'
    })

    expect(employee).toHaveProperty('id')
  })

  it('should not be able to create employee with email invalid', async () => {
    await expect(
      createEmployeeService.execute({
        name: 'John Doe',
        email: 'johndoe',
        phone: '83999999999',
        typePix: TypePix.RANDOM,
        keyPix: '123123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create employee with phone invalid', async () => {
    await expect(
      createEmployeeService.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        phone: 'abc',
        typePix: TypePix.RANDOM,
        keyPix: '123123123'
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create employee with key pix invalid', async () => {
    await expect(
      createEmployeeService.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        phone: '83999999999',
        typePix: TypePix.CPF_CNPJ,
        keyPix: 'abc'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
