import { UpdateEmployeeService } from '@modules/employees/services/UpdateEmployeeService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, email, phone, typePix, keyPix } = request.body
    const updateEmployee = container.resolve(UpdateEmployeeService)

    const employee = await updateEmployee.execute({
      id,
      data: {
        name,
        email,
        phone,
        typePix,
        keyPix
      }
    })

    return response.json({ employee })
  }
}
