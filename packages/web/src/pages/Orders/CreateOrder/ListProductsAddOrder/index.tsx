import React from 'react'
import Button from '../../../../components/Button'
import ListProductsAdded from './ListProductsAdded'
import { Product } from '../../../../interfaces/Product'
import { Container, ListProduct } from './styles'

type Props = {
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  clientsId: string[]
  productsAdded: Product[]
}

export default function ListProductsAddOrder({
  setModalIsOpen,
  clientsId,
  productsAdded
}: Props) {
  return (
    <Container>
      <Button
        type="button"
        label="small"
        onClick={() => setModalIsOpen(true)}
        disabled={!clientsId.length}
      >
        Adicionar produtos
      </Button>

      <ListProduct>
        {productsAdded.map(p => (
          <ListProductsAdded product={p} key={p.id} />
        ))}
      </ListProduct>
    </Container>
  )
}
