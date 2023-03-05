import { FormHandles } from '@unform/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import { api } from '../../../services/api'
import { Header } from '../../../components/Header'
import { Product } from '../../../interfaces/Product'

import RegistrarModals from './Modals'
import ListProductsAddOrder from './ListProductsAddOrder'

import { Container, Content, HeaderWrapper } from './styles'
import InfoPedido from './InfoPedido'

export function CreateOrder() {
  const formRef = useRef<FormHandles>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [precoTotal, setPrecoTotal] = useState(0)
  const [clientsId, setClientsId] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  const productsAdded = products.filter(p => p.add)

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products')
      setProducts([
        ...response.data.products.map((p: Product) => ({
          ...p,
          add: false,
          qtd: 0
        }))
      ])
    }
    getProducts()
  }, [])

  const changeValueMaoObra = useCallback(() => {
    const precoMaoObra = +formRef.current?.getData().workmanship
    const totalProdutos = products.reduce((acc, p) => {
      if (p.add) acc += +p.price.replace('$', '') * p.qtd
      return acc
    }, 0)
    return setPrecoTotal(totalProdutos + precoMaoObra)
  }, [products])

  return (
    <Container>
      <Header />
      <HeaderWrapper>
        <h3>Criar um novo pedido</h3>

        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
      </HeaderWrapper>

      <h3>Total do pedido: R$ {precoTotal}</h3>

      <Content>
        <InfoPedido
          clientsId={clientsId}
          changeValueMaoObra={changeValueMaoObra}
          products={products}
          setClientsId={setClientsId}
          formRef={formRef}
        />

        <ListProductsAddOrder
          clientsId={clientsId}
          productsAdded={productsAdded}
          setModalIsOpen={setModalIsOpen}
        />
      </Content>

      <RegistrarModals
        changeValueMaoObra={changeValueMaoObra}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
        products={products}
      />
    </Container>
  )
}
