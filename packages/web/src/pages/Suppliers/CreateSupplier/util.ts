import { ItemSelect } from '../../../components/SelectInput'
import { TypePix } from '../../../hooks/supplier'

export const typesPix: ItemSelect[] = [
  {
    label: 'CPF/CNPJ',
    value: TypePix.CPF_CNPJ
  },
  {
    label: 'E-MAIL',
    value: TypePix.EMAIL
  },
  {
    label: 'TELEFONE',
    value: TypePix.PHONE
  },
  {
    label: 'ALEATÓRIA',
    value: TypePix.RANDOM
  }
]
