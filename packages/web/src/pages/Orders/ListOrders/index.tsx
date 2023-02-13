import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  ContainerWithoutOrder,
  Content,
  HeaderWrapper
} from './styles'

import { Header } from '../../../components/Header'
import { api } from '../../../services/api'
import { Order } from '../../../interfaces/Order'
import OrdersTable from './OrdersTable'

export default function ListOrders() {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    async function getOrders() {
      const response = await api.get('/orders')
      setOrders([...response.data.orders])
    }
    getOrders()
  }, [])

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Meus pedidos</h3>
        <Link to="/create-order">Cadastrar novo pedido</Link>
      </HeaderWrapper>

      <Content>
        {orders.length ? (
          <OrdersTable orders={orders} setOrders={setOrders} />
        ) : (
          <ContainerWithoutOrder>
            Você não possui pedidos cadastrados
          </ContainerWithoutOrder>
        )}
      </Content>
    </Container>
  )
}
