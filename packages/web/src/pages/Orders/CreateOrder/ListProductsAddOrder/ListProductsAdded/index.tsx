import React from 'react'
import { Product } from '../../../../../interfaces/Product'

import { Container } from './styles'

type ListProductsAddedProps = {
  product: Product
}

export default function ListProductsAdded({
  product,
  ...rest
}: ListProductsAddedProps) {
  return (
    <Container {...rest}>
      <h3>{product.title}</h3>
      <p>
        <strong>Preço ({product.price})</strong>
        <strong>QTD ({product.qtd})</strong>
      </p>
    </Container>
  )
}
