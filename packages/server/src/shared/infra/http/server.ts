import config, { logger } from '@config/index'

import { app } from './app'

app
  .listen(config.port)
  .on('listening', () => logger.info('🚀 Server started on port 3333!'))
