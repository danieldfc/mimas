import { container } from 'tsyringe'

import EmployeesRepository from '@modules/employees/infra/typeorm/repositories/EmployeesRepository'
import IEmployeesRepository from '@modules/employees/infra/typeorm/repositories/IEmployeesRepository'

container.registerSingleton<IEmployeesRepository>(
  'EmployeesRepository',
  EmployeesRepository
)
