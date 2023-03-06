import { inject, injectable } from 'tsyringe'
import IEmployeesRepository from '@modules/employees/infra/typeorm/repositories/IEmployeesRepository'
import { AppError } from '@shared/errors/AppError'

type IRequest = {
  id: string
}

@injectable()
export class DeleteEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const employee = await this.employeesRepository.findById(id)

    if (!employee) {
      throw new AppError('Employee not found')
    }

    await this.employeesRepository.destroy(id)
  }
}
