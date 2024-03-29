import { TypePix } from '@shared/utils'

export default interface IUpdateSupplierDTO {
  name?: string
  email?: string
  phone?: string
  address?: string
  phoneSecondary?: string
  typePix?: TypePix
  keyPix?: string
}
