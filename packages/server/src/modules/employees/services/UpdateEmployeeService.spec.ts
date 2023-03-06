import { AppError } from '@shared/errors/AppError'
import { TypePix } from '@shared/utils'
import { Employee } from '../infra/typeorm/entities/Employee'
import FakeEmployeesRepository from '../infra/typeorm/repositories/fakes/FakeEmployeesRepository'
import { UpdateEmployeeService } from './UpdateEmployeeService'

let fakeEmployeesRepository: FakeEmployeesRepository
let updateEmployeeService: UpdateEmployeeService

describe('UpdateEmployee', () => {
  let employee: Employee

  beforeEach(async () => {
    fakeEmployeesRepository = new FakeEmployeesRepository()

    updateEmployeeService = new UpdateEmployeeService(fakeEmployeesRepository)

    employee = await fakeEmployeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '83999999999',
      typePix: TypePix.RANDOM,
      keyPix: '123123123'
    })
  })

  it('should be able to update employee', async () => {
    const emailUpdate = 'jonh@email.com'
    const employeeUpdated = await updateEmployeeService.execute({
      id: employee.id,
      data: {
        email: emailUpdate
      }
    })
    expect(employeeUpdated.email).toEqual(emailUpdate)
  })

  it('should not be able to update employee not exists', async () => {
    await expect(
      updateEmployeeService.execute({
        id: 'non-id-wrong',
        data: {}
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update employee with email invalid', async () => {
    await expect(
      updateEmployeeService.execute({
        id: employee.id,
        data: {
          email: 'jonh'
        }
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update employee with phone invalid', async () => {
    await expect(
      updateEmployeeService.execute({
        id: employee.id,
        data: {
          phone: 'abc'
        }
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to update employee with key pix invalid', async () => {
    await expect(
      updateEmployeeService.execute({
        id: employee.id,
        data: {
          typePix: TypePix.EMAIL,
          keyPix: 'abc'
        }
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
