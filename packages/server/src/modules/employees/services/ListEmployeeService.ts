import { inject, injectable } from 'tsyringe'
import { Employee } from '@modules/employees/infra/typeorm/entities/Employee'
import IEmployeesRepository from '@modules/employees/infra/typeorm/repositories/IEmployeesRepository'

@injectable()
export class ListEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository
  ) {}

  public async execute(): Promise<Employee[]> {
    return this.employeesRepository.list()
  }
}
