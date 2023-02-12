import config, { logger } from '@config/index'

import { app } from './app'

app
  .listen(config.port)
  .once('listening', () =>
    logger.info(`🚀 Server started on port ${config.port}!`)
  )
