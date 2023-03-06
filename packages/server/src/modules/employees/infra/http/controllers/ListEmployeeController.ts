import { ListEmployeeService } from '@modules/employees/services/ListEmployeeService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ListEmployeeController {
  async handle(_: Request, response: Response): Promise<Response> {
    const listEmployee = container.resolve(ListEmployeeService)

    const employees = await listEmployee.execute()

    return response.json({ employees })
  }
}
