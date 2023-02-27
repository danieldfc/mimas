import { ProductType } from '../../../interfaces/Product'
import { ItemSelect } from '../../../components/SelectInput'

export const typeProducts: ItemSelect[] = [
  {
    label: 'Metros',
    value: ProductType.METERS
  },
  {
    label: 'Gramas',
    value: ProductType.GRAMS
  }
]
