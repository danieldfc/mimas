import React from 'react'
import { CardListProducts } from './CardListProducts'
import { Product } from '../../../../interfaces/Product'
import { Container } from './styles'

type Props = {
  closeModal: () => void
  modalIsOpen: boolean
  products: Product[]
  changeValueMaoObra: () => void
}

export default function RegistrarModals({
  closeModal,
  modalIsOpen,
  changeValueMaoObra,
  products
}: Props) {
  return (
    <Container
      isOpen={modalIsOpen}
      onAfterClose={() => changeValueMaoObra()}
      onRequestClose={closeModal}
      title="Cadastro de itens do pedido"
    >
      <CardListProducts products={products} />
    </Container>
  )
}
