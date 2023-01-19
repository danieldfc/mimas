export const auth = {
  jwt: {
    secret: process.env.APP_SECRET || 'default',
    secretRefreshToken: process.env.APP_SECRET_REFRESH_TOKEN || 'default',
    expiresIn: '15m',
    expiresInRefreshToken: '10s',
    expiresInRefreshTokenDays: 1
    // expiresInRefreshToken: '30d',
    // expiresInRefreshTokenDays: 30
  }
}
