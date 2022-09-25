const isDevelopment = !!(process.env.NODE_ENV === 'development')

const environments = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
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
