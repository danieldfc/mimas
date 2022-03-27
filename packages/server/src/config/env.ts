export const env = {
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '') || 5432,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    name: process.env.DB_NAME || ''
  }
}
