import React from 'react'
import { Product } from '../../../../../interfaces/Product'
import CardProduct from './CardProduct'
import { Container, Title } from './styles'

type IProps = {
  products: Product[]
}

export function CardListProducts({ products }: IProps) {
  return (
    <>
      <Title>Produtos disponíveis:</Title>
      <Container>
        {products.map((product: Product) => (
          <CardProduct product={product} key={product.id} />
        ))}
      </Container>
    </>
  )
}
