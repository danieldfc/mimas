import { TypePix } from '@shared/utils'

export interface IUpdateEmployeeDTO {
  name?: string
  email?: string
  phone?: string
  typePix?: TypePix
  keyPix?: string
}
