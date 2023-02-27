import { CheckCpfCnpj, CheckEmail } from '@shared/utils'
import { CheckPhone } from '@shared/utils/CheckPhone'
import { TypePix } from '../infra/typeorm/entities/Supplier'

export class CheckKeyPix {
  public isValid(type: TypePix, key: string) {
    if (type === TypePix.CPF_CNPJ) return this.isValidCpfCnpj(key)
    if (type === TypePix.PHONE) return this.isValidPhone(key)
    if (type === TypePix.EMAIL) return this.isValidEmail(key)
    if (type === TypePix.RANDOM) return this.isValidRandom(key)

    return false
  }

  private isValidEmail(key: string) {
    return new CheckEmail(key).verify()
  }

  private isValidCpfCnpj(key: string) {
    return new CheckCpfCnpj(key).verify()
  }

  private isValidPhone(key: string) {
    return new CheckPhone(key).verify()
  }

  private isValidRandom(key: string) {
    return key.length && /^[A-Za-z0-9]*\d+[A-Za-z0-9]*$/g.test(key)
  }
}
