import { CreateEmployeeService } from '@modules/employees/services/CreateEmployeeService'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class CreateEmployeeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, typePix, keyPix } = request.body

    const createEmployee = container.resolve(CreateEmployeeService)

    const employee = await createEmployee.execute({
      name,
      email,
      phone,
      typePix,
      keyPix
    })

    return response.status(201).json({ employee })
  }
}
