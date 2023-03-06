import { AppError } from '@shared/errors/AppError'
import { TypePix } from '@shared/utils'
import FakeEmployeesRepository from '../infra/typeorm/repositories/fakes/FakeEmployeesRepository'
import { ShowEmployeeService } from './ShowEmployeeService'

let fakeEmployeesRepository: FakeEmployeesRepository
let showEmployeeService: ShowEmployeeService

describe('ShowEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()

    showEmployeeService = new ShowEmployeeService(fakeEmployeesRepository)
  })

  it('should be able to show employee', async () => {
    const employee = await fakeEmployeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '83999999999',
      typePix: TypePix.RANDOM,
      keyPix: '123123123'
    })

    const showEmployee = await showEmployeeService.execute({
      id: employee.id
    })

    expect(showEmployee.id).toEqual(employee.id)
  })

  it('should not be able to show employee not exists', async () => {
    await expect(
      showEmployeeService.execute({
        id: 'non-id-wrong'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
