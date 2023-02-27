import { validaCnpj } from './validaCnpj'
import { validaCpf } from './validaCpf'

export class CheckCpfCnpj {
  constructor(private readonly cpfCnpj: string) {}

  verify(): boolean {
    const value = this.cpfCnpj.replace(/\D/g, '')
    if (value.length === 11) return this.verifyCpf(value)
    if (value.length === 14) return this.verifyCnpj(value)

    return false
  }

  verifyCpf(value: string): boolean {
    return validaCpf(value)
  }

  verifyCnpj(value: string): boolean {
    return validaCnpj(value)
  }
}
