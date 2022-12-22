const isDevelopment = !!(process.env.NODE_ENV === 'development')

const folderProd = isDevelopment ? 'src' : 'dist'
const filesProd = isDevelopment ? '.ts' : '.js'

const environments = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER || 'xxx',
  password: process.env.DB_PASS || 'xxx',
  database: process.env.DB_NAME || 'costura',
  entities: [`src/modules/**/entities/*.ts`],
  migrations: [`${folderProd}/shared/infra/typeorm/migrations/*${filesProd}`],
  seeds: [`${folderProd}/shared/infra/typeorm/seeds/**/*${filesProd}`],
  factories: [`${folderProd}/shared/infra/typeorm/factories/**/*${filesProd}`],
  cli: {
    entitiesDir: `${folderProd}/modules/**/entities`,
    migrationsDir: `${folderProd}/shared/infra/typeorm/migrations`,
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
