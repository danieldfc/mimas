type IEnv = {
  linkWeb: string
}

export const env: IEnv = {
  linkWeb: process.env.APP_WEB ?? 'http://localhost:3000'
}
