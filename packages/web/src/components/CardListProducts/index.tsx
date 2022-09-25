import React from 'react'
import { Product } from '../../pages/CreateOrder'
import CardProduct from '../CardProduct'
import { Container } from './styles'

type IProps = {
  products: Product[]
}

export function CardListProducts({ products }: IProps) {
  return (
    <Container>
      <h3>Produtos disponíveis:</h3>
      {products.map((product: Product) => (
        <CardProduct product={product} key={product.id} />
      ))}
    </Container>
  )
}
