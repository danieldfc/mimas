const isDevelopment = !!(process.env.NODE_ENV === 'development')

const folderProd = isDevelopment ? 'src' : 'dist'
const filesProd = isDevelopment ? '.ts' : '.js'

const environments = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [`${folderProd}/modules/**/entities/*${filesProd}`],
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
