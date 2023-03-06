import { inject, injectable } from 'tsyringe'
import { Employee } from '@modules/employees/infra/typeorm/entities/Employee'
import IEmployeesRepository from '@modules/employees/infra/typeorm/repositories/IEmployeesRepository'
import { AppError } from '@shared/errors/AppError'

type IRequest = {
  id: string
}

@injectable()
export class ShowEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository
  ) {}

  public async execute({ id }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.findById(id)

    if (!employee) {
      throw new AppError('Employee not found')
    }

    return employee
  }
}
