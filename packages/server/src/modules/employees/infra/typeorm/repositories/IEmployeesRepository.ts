import { ICreateEmployeeDTO } from '@modules/employees/dtos'
import { Employee } from '@modules/employees/infra/typeorm/entities/Employee'

export default interface IEmployeesRepository {
  create(data: ICreateEmployeeDTO): Promise<Employee>
  save(employee: Employee): Promise<void>
  findById(id: string): Promise<Employee | undefined>
  destroy(id: string): Promise<void>
  list(): Promise<Employee[]>
}
