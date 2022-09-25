const isDevelopment = !!(process.env.NODE_ENV === 'development')

console.log('host', process.env.DB_HOST)
console.log('port', process.env.DB_PORT)
console.log('user', process.env.DB_USER)
console.log('pass', process.env.DB_PASS)

const environments = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${isDevelopment ? 'src' : 'dist'}/modules/**/entities/*{.ts,.js}`],
  migrations: [`${isDevelopment ? 'src' : 'dist'}/shared/infra/typeorm/migrations/*{.ts,.js}`],
  seeds: [`${isDevelopment ? 'src' : 'dist'}/shared/infra/typeorm/seeds/**/*{.ts,.js}`],
  factories: [`${isDevelopment ? 'src' : 'dist'}/shared/infra/typeorm/factories/**/*{.ts,.js}`],
  cli: {
    entitiesDir: 'src/modules/**/entities',
    migrationsDir: 'src/shared/infra/typeorm/migrations'
  }
}

const base = {
  production: environments,
  development: environments,
  test: {
    ...environments,
    database: 'costura-test'
  },
}

module.exports = {
  ...base[process.env.NODE_ENV || 'development']
}
