import { TypePix } from '@shared/utils'
import FakeEmployeesRepository from '../infra/typeorm/repositories/fakes/FakeEmployeesRepository'
import { ListEmployeeService } from './ListEmployeeService'

let fakeEmployeesRepository: FakeEmployeesRepository
let listEmployeeService: ListEmployeeService

describe('ListEmployee', () => {
  beforeEach(() => {
    fakeEmployeesRepository = new FakeEmployeesRepository()

    listEmployeeService = new ListEmployeeService(fakeEmployeesRepository)
  })

  it('should be able to list employees', async () => {
    await fakeEmployeesRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '83999999999',
      typePix: TypePix.RANDOM,
      keyPix: '123123123'
    })

    const employee = await listEmployeeService.execute()

    expect(employee[0]).toHaveProperty('id')
  })
})
