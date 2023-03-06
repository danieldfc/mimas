import { AppError } from '@shared/errors/AppError'
import { TypePix } from '@shared/utils'
import FakeEmployeesRepository from '../infra/typeorm/repositories/fakes/FakeEmployeesRepository'
import { DeleteEmployeeService } from './DeleteEmployeeService'

let fakeEmployeesRepository: FakeEmployeesRepository
let deleteEmployeeService: DeleteEmployeeService

describe('DeleteEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()

    deleteEmployeeService = new DeleteEmployeeService(fakeEmployeesRepository)
  })

  it('should be able to delete employee', async () => {
    const employee = await fakeEmployeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '83999999999',
      typePix: TypePix.RANDOM,
      keyPix: '123123123'
    })

    await deleteEmployeeService.execute({
      id: employee.id
    })

    const employeeDeleted = await fakeEmployeesRepository.findById(employee.id)

    expect(employeeDeleted).toBeUndefined()
  })

  it('should not be able to delete employee not exists', async () => {
    await expect(
      deleteEmployeeService.execute({
        id: 'non-id-wrong'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
