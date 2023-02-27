import { TypePix } from '../infra/typeorm/entities/Supplier'

export default interface IUpdateSupplierDTO {
  name?: string
  email?: string
  phone?: string
  address?: string
  phoneSecondary?: string
  typePix?: TypePix
  keyPix?: string
}
