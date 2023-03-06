import { inject, injectable } from 'tsyringe'
import IEmployeesRepository from '@modules/employees/infra/typeorm/repositories/IEmployeesRepository'
import { AppError } from '@shared/errors/AppError'
import { IUpdateEmployeeDTO } from '../dtos'
import { CheckKeyPix } from '@modules/orders/utils/CheckKeyPix'
import { CheckEmail, CheckPhone } from '@shared/utils'
import { Employee } from '../infra/typeorm/entities/Employee'

type IRequest = {
  id: string
  data: IUpdateEmployeeDTO
}

@injectable()
export class UpdateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository
  ) {}

  public async execute({ id, data }: IRequest): Promise<Employee> {
    const employee = await this.employeesRepository.findById(id)

    if (!employee) {
      throw new AppError('Employee not found')
    }

    if (data.email && !new CheckEmail(data.email).verify()) {
      throw new AppError('E-mail invalid')
    }

    if (data.phone && !new CheckPhone(data.phone).verify()) {
      throw new AppError('Phone invalid')
    }

    if (
      data.typePix &&
      data.keyPix &&
      !new CheckKeyPix().isValid(data.typePix, data.keyPix)
    ) {
      throw new AppError('Key pix invalid')
    }

    Object.assign(employee, data)

    await this.employeesRepository.save(employee)

    return employee
  }
}
