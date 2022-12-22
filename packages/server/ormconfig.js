const isDevelopment = !!(process.env.NODE_ENV === 'development')

const folderProd = isDevelopment ? 'src' : 'dist'

const environments = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'xxx',
  password: process.env.DB_PASS || 'xxx',
  database: process.env.DB_NAME || 'costura',
  entities: [folderProd + '/modules/**/entities/*{.js,.ts}'],
  migrations: [folderProd + '/shared/infra/typeorm/migrations/*{.js,.ts}'],
  seeds: [folderProd + '/shared/infra/typeorm/seeds/**/*{.js,.ts}'],
  factories: [folderProd + '/shared/infra/typeorm/factories/**/*{.js,.ts}'],
  cli: {
    entitiesDir: 'src/modules/**/entities',
    migrationsDir: 'src/shared/infra/typeorm/migrations',
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
