export * from '../config/logger'
export * from '../config/env'

export default {
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 3333
}
