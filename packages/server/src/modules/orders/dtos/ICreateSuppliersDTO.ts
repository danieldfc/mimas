import { TypePix } from '@shared/utils'

export default interface ICreateSuppliersDTO {
  name: string
  email: string
  phone: string
  phoneSecondary?: string
  address: string
  typePix?: TypePix
  keyPix?: string
}
