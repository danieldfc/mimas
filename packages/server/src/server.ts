import 'dotenv/config'

import express, { Application, NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import { logger } from './config'
import { AppError } from './infra/errors/AppError'

import { routes } from './routes'

class App {
  public server: Application

  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    this.server.use(routes)
  }

  exceptionHandler() {
    this.server.use(
      async (err: Error, req: Request, res: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return res
            .status(err.statusCode)
            .json({ message: err.message, status: 'error' })
        }

        logger.error(`${err.name}: ${err.stack}`)

        return res.status(500).json({ error: 'Internal server error' })
      }
    )
  }
}

const app = new App().server

export { app }
