import { v4 as uuidV4 } from 'uuid'
import { ICreateEmployeeDTO } from '@modules/employees/dtos'
import { Employee } from '@modules/employees/infra/typeorm/entities/Employee'
import IEmployeesRepository from '../IEmployeesRepository'

export default class FakeEmployeesRepository implements IEmployeesRepository {
  private employees: Employee[] = []

  public async create({
    email,
    name,
    keyPix,
    phone,
    typePix
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = new Employee()

    Object.assign(employee, {
      id: uuidV4(),
      email,
      name,
      keyPix,
      phone,
      typePix
    })

    this.employees.push(employee)

    return employee
  }

  async save(employee: Employee): Promise<void> {
    const findIndex = this.employees.findIndex(
      findEmployee => findEmployee.id === employee.id
    )
    this.employees[findIndex] = employee
  }

  async findById(id: string): Promise<Employee | undefined> {
    return this.employees.find(findEmployee => findEmployee.id === id)
  }

  async list(): Promise<Employee[]> {
    return this.employees
  }

  async destroy(id: string): Promise<void> {
    const findIndex = this.employees.findIndex(
      findEmployee => findEmployee.id === id
    )

    if (findIndex >= 0) {
      this.employees.splice(findIndex, 1)
    }
  }
}
