import { inject, injectable } from 'tsyringe'
import { Employee } from '@modules/employees/infra/typeorm/entities/Employee'
import IEmployeesRepository from '@modules/employees/infra/typeorm/repositories/IEmployeesRepository'
import { AppError } from '@shared/errors/AppError'
import { CheckEmail, CheckPhone, TypePix } from '@shared/utils'
import { CheckKeyPix } from '@modules/orders/utils/CheckKeyPix'

type IRequest = {
  name: string
  email?: string
  phone: string
  typePix: TypePix
  keyPix: string
}

@injectable()
export class CreateEmployeeService {
  constructor(
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository
  ) {}

  public async execute({
    name,
    email,
    phone,
    keyPix,
    typePix
  }: IRequest): Promise<Employee> {
    if (email && !new CheckEmail(email).verify()) {
      throw new AppError('E-mail invalid')
    }

    if (!new CheckPhone(phone).verify()) {
      throw new AppError('Phone invalid')
    }

    if (!new CheckKeyPix().isValid(typePix, keyPix)) {
      throw new AppError('Key pix invalid')
    }

    return this.employeesRepository.create({
      name,
      email,
      phone,
      keyPix,
      typePix
    })
  }
}
