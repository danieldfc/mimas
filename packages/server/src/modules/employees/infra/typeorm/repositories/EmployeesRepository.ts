import { ICreateEmployeeDTO } from '@modules/employees/dtos'
import { Repository, getRepository } from 'typeorm'
import { Employee } from '@modules/employees/infra/typeorm/entities/Employee'
import IEmployeesRepository from './IEmployeesRepository'

export default class EmployeesRepository implements IEmployeesRepository {
  private ormRepository: Repository<Employee>

  constructor() {
    this.ormRepository = getRepository(Employee)
  }

  public async create({
    email,
    name,
    keyPix,
    phone,
    typePix
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.ormRepository.create({
      email,
      name,
      keyPix,
      phone,
      typePix
    })

    await this.save(employee)

    return employee
  }

  async save(employee: Employee): Promise<void> {
    await this.ormRepository.save(employee)
  }

  async findById(id: string): Promise<Employee | undefined> {
    return this.ormRepository.findOne({
      where: { id }
    })
  }

  async list(): Promise<Employee[]> {
    return this.ormRepository.find()
  }

  async destroy(id: string): Promise<void> {
    await this.ormRepository.delete(id)
  }
}
