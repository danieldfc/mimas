export class CheckEmail {
  constructor(private readonly email: string) {}

  verify(): boolean {
    if (!this.email) return false

    return this.validateEmail()
  }

  private validateEmail(): boolean {
    const regexValidMail = /\S+@\S+\.\S+/
    return regexValidMail.test(this.email)
  }
}
