import React from 'react'
import { formatMoney } from '../../../utils/formatMoney'

import { IProductMerged } from '../../Dashboard'

import { Container } from './styles'

type Props = {
  product: IProductMerged
  index: number
}

export function MetadadoProduct({ product, index }: Props) {
  return (
    <Container>
      <h4>
        Produto #{index + 1} - {product.title} - {formatMoney(product.price)} x{' '}
        {product.qtd}
      </h4>
      <p>{product.description}</p>
    </Container>
  )
}
