import React, { useCallback, useState } from 'react'
import { Product } from '../../pages/CreateOrder'

import { Container } from './styles'

interface Props {
  product: Product
}

export default function CardProduct({ product }: Props) {
  const [qtdProduct, setQtdProduct] = useState(product.qtd ?? 0)
  const [, setAddedProduct] = useState(product.add ?? false)

  const handleAddProduct = useCallback(
    (product: Product, qtdNew = 0, hasVerify = false) => {
      if (product.add && hasVerify) {
        setQtdProduct(0)
        setAddedProduct(() => false)
        product.qtd = 0
        product.add = false
      } else {
        setQtdProduct(qtdNew)
        setAddedProduct(() => !!qtdNew)
        product.qtd = qtdNew
        product.add = !!qtdNew
      }
    },
    []
  )

  const productAdded = useCallback(
    (productAdd = false) => (!productAdd ? 'Adicionar' : 'Remover'),
    []
  )

  return (
    <Container key={product.id}>
      <p>{product.title}</p>
      <span>{product.price}</span>
      <input
        type="number"
        placeholder="QTD"
        min="0"
        value={qtdProduct}
        onChange={e => handleAddProduct(product, +e.target.value, false)}
      />
      <button
        type="button"
        onClick={() => handleAddProduct(product, product.qtd, true)}
      >
        {productAdded(product.add)}
      </button>
    </Container>
  )
}
