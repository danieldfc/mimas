import 'reflect-metadata'
import 'dotenv/config'

import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'

import 'express-async-errors'

import { logger } from '@config/index'
import { AppError } from '@shared/errors/AppError'

import { routes } from './routes'

import '@shared/infra/typeorm'
import '@shared/container'

const app = express()

app.use(cors({ origin: process.env.APP_WEB }))
app.use(express.json())
app.use(routes)
app.use(async (err: Error, _req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, status: 'error' })
  }

  console.log(err)
  logger.error(err.message)

  return res
    .status(500)
    .json({ status: 'error', error: 'Internal server error' })
})

export { app }
