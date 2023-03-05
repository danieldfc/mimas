import React, { useCallback, useState } from 'react'
import { Product } from '../../../../../../interfaces/Product'
import { typeProducts } from '../../../../../Suppliers/ListProductsSupplier/util'

import { Container } from './styles'

interface Props {
  product: Product
}

export default function CardProduct({ product }: Props) {
  const [qtdProduct, setQtdProduct] = useState(product.qtd ?? 0)

  const handleAddProduct = useCallback((product: Product, qtdNew = 0) => {
    setQtdProduct(qtdNew)
    product.qtd = qtdNew
    product.add = !!qtdNew
  }, [])

  return (
    <Container key={product.id}>
      <div>
        <h4>
          {product.title} - {product.price}
        </h4>
        <small>
          QTD máx: {product.maximumAmount}{' '}
          {typeProducts.find(t => t.value === product.type)?.label}
        </small>
      </div>
      <div>
        <strong>Quantidade:</strong>
        <input
          type="number"
          placeholder="QTD"
          min="0"
          value={qtdProduct}
          max={product.maximumAmount}
          onChange={e => {
            if (+e.target.value <= product.maximumAmount) {
              handleAddProduct(product, +e.target.value)
            }
          }}
        />
      </div>
    </Container>
  )
}
