const isDevelopment = !!(process.env.NODE_ENV === 'development')

const environments = {
  "type": "postgres",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PASS,
  "database": process.env.DB_NAME,
  "entities": [`${isDevelopment ? 'src' : 'dist'}/modules/**/entities/*{.ts,.js}`],
  "migrations": [`${isDevelopment ? 'src' : 'dist'}/shared/database/migrations/*{.ts,.js}`],
  "seeds": [`${isDevelopment ? 'src' : 'dist'}/shared/database/seeds/**/*{.ts,.js}`],
  "factories": [`${isDevelopment ? 'src' : 'dist'}/shared/database/factories/**/*{.ts,.js}`],
  "cli": {
    "entitiesDir": "src/modules/**/entities",
    "migrationsDir": "src/shared/database/migrations"
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
