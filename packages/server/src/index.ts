import config, { logger } from '@config/index'
import { prismaClient } from './database'
import { app } from './server'

async function main() {
  app.listen(config.port, () => logger.info('Server running!!'))
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prismaClient.$disconnect()
  })
