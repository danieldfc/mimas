export class CheckFone {
  constructor(private readonly phone: string) {}

  verify(): boolean {
    if (!this.phone) return false

    return this.validatePhone()
  }

  private validatePhone(): boolean {
    const regexValidPhone =
      /(\b\(\d{2}\)\s?[9]?\s?\d{4}(-|\s)?\d\d{4})|(\b\d{2}\s?[9]?\s?\d{4}(-|\s)?\d{4})|(\b([9]|[9]\s)?\d{4}(-|\s)?\d{4})|(\b\d{4}(-|\s)?\d{4})/
    return regexValidPhone.test(this.phone)
  }
}
