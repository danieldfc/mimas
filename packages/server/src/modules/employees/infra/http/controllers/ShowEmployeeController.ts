import { ShowEmployeeService } from '@modules/employees/services/ShowEmployeeService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ShowEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const showEmployee = container.resolve(ShowEmployeeService)

    const employee = await showEmployee.execute({ id })

    return response.json({ employee })
  }
}
