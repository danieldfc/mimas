import { DeleteEmployeeService } from '@modules/employees/services/DeleteEmployeeService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DeleteEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const deleteEmployee = container.resolve(DeleteEmployeeService)

    await deleteEmployee.execute({ id })

    return response.status(204).send()
  }
}
