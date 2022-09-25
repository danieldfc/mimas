import React from 'react'
import { Product } from '../../pages/CreateOrder'

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
      {product.title} - Preço ({product.price}) - QTD ({product.qtd})
    </Container>
  )
}
