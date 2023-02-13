import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { LoadNotificationUserService } from '@modules/notifications/services/LoadNotificationUserService'
import { ReadNotificationUserService } from '@modules/notifications/services/ReadNotificationUserService'
import { ReadAllNotificationUserService } from '@modules/notifications/services/ReadAllNotificationUserService'

export class NotificationsController {
  public async list(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user
    const { limit = 5, offset = 0 } = request.query

    const loadNotificationUser = container.resolve(LoadNotificationUserService)

    const notifications = await loadNotificationUser.execute({
      userId,
      take: parseInt(limit as string),
      skip: parseInt(offset as string)
    })

    return response.status(200).json({ notifications })
  }

  public async read(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user
    const { id } = request.params

    const readNotificationUser = container.resolve(ReadNotificationUserService)

    const notification = await readNotificationUser.execute({
      id,
      userId
    })

    return response.status(200).json({ notification })
  }

  public async readAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id: userId } = request.user

    const readAllNotificationUser = container.resolve(
      ReadAllNotificationUserService
    )

    await readAllNotificationUser.execute({
      userId
    })

    return response.status(204).json()
  }
}
