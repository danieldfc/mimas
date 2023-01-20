export const auth = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    secretRefreshToken: process.env.APP_SECRET_REFRESH_TOKEN || 'default',
    expiresIn: '45m',
    expiresInRefreshToken: '30d',
    expiresInRefreshTokenDays: 30
  }
}
