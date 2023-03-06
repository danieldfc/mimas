import { TypePix } from '@shared/utils'

export interface ICreateEmployeeDTO {
  name: string
  email?: string
  phone: string
  typePix: TypePix
  keyPix: string
}
