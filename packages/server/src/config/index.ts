export * from './logger'
export * from './env'
export * from './auth'

export default {
  host: process.env.HOST || 'http://localhost',
  port: process.env.PORT || 3333
}
