import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Container, Content, Wrapper } from './styles'
import { formatMoney } from '../../utils/formatMoney'
import { formatDate } from '../../utils/formatDate'

import { Header } from '../../components/Header'
import TableList from '../../components/TableList'
import api from '@mimas/axios-config'
import { Client } from '../../hooks/client'

type Order = {
  id: string
  title: string
  finalPrice: string
  description: string
  clients: Client[]
  createdAt: Date
}

export default function Dashboard() {
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

      <Content>
        <Wrapper>
          <h3>Meus pedidos</h3>
          <Link to="/order">Criar pedido</Link>
        </Wrapper>

        <TableList>
          <>
            <thead>
              <tr>
                <th> PEDIDO </th>
                <th className="center"> CLIENTE </th>
                <th className="center"> PREÇO </th>
                <th className="center"> DATA ENTREGA </th>
                <th className="center"> AÇÕES </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.map((order, key) => (
                <tr key={order.id || key}>
                  <td>
                    <Link to={`/order/${order.id}`}>{order.title}</Link>
                  </td>
                  <td className="center">{order.clients[0].name}</td>
                  <td className="center">
                    {formatMoney(
                      +order.finalPrice.replace('$', '').replace(',', '')
                    )}
                  </td>
                  <td className="center">
                    {formatDate(new Date(order.createdAt))}h
                    {/* TODO - deveria ser a data de entrega do produto */}
                  </td>
                  <td className="actions">
                    <div>
                      <button
                        type="button"
                        className="finish"
                        onClick={() => {
                          console.log('Deu certo finish')
                        }}
                      >
                        Finalizar
                      </button>
                      <button
                        type="button"
                        className="cancel"
                        onClick={() => {
                          console.log('Deu certo cancel')
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </>
        </TableList>
      </Content>
    </Container>
  )
}
