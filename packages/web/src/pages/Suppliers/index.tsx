import React, { useCallback, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { useSupplier } from '../../hooks/supplier'
import { Product } from '../../interfaces/Product'
import { ListProductsSupplier } from './ListProductsSupplier'
import { ListSuppliers } from './ListSuppliers'

import {
  AsideSeparator,
  Container,
  ContainerWithoutSupplier,
  Content,
  Wrapper
} from './styles'

export default function Suppliers() {
  const { suppliers } = useSupplier()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalFornecedorIsOpen, setModalFornecedorIsOpen] = useState(false)
  const [modalProductIsOpen, setModalProductIsOpen] = useState(false)

  const [productSelected, setProductSelected] = useState<Product | null>(null)

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
    setModalFornecedorIsOpen(false)
    setModalProductIsOpen(false)
  }, [setModalIsOpen, setModalProductIsOpen, setModalFornecedorIsOpen])

  return (
    <Container>
      <Header />
      <Wrapper>
        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
        <div>
          <h3>Meus fornecedores</h3>
          <Link to="/create-supplier">Cadastrar novo fornecedor</Link>
        </div>
      </Wrapper>

      <Content>
        {!suppliers.length && (
          <ContainerWithoutSupplier>
            Você não possui fornecedores cadastrados
          </ContainerWithoutSupplier>
        )}

        {!!suppliers.length && (
          <AsideSeparator>
            <ListSuppliers
              modalFornecedorIsOpen={modalFornecedorIsOpen}
              closeModal={closeModal}
            />
            <ListProductsSupplier
              setModalFornecedorIsOpen={setModalFornecedorIsOpen}
              modalProductIsOpen={modalProductIsOpen}
              setModalProductIsOpen={setModalProductIsOpen}
              productSelected={productSelected}
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              closeModal={closeModal}
              setProductSelected={setProductSelected}
            />
          </AsideSeparator>
        )}
      </Content>
    </Container>
  )
}
