export class AppError {
  public readonly message: string

  public readonly statusCode: number

  public readonly code: 'token.expired' | 'error'

  constructor(
    message: string,
    statusCode = 400,
    code: 'token.expired' | 'error' = 'error'
  ) {
    this.message = message
    this.statusCode = statusCode
    this.code = code
  }
}
