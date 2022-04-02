import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Container, Content, Wrapper } from './styles'
import { formatMoney } from '../../utils/formatMoney'
import { formatDate } from '../../utils/formatDate'

import { Header } from '../../components/Header'
import TableList from '../../components/TableList'

export default function Dashboard() {
  const [orders, setOrders] = useState([
    {
      id: 'kasmdlkmasdlkm',
      title: 'Meu novo pedido 1',
      description: 'Este pedido tem como objetivo 1...',
      cliente: {
        name: 'Aldaci',
        telefone: '(83) 9 9999-99'
      },
      dateDelivere: new Date('2022-03-27 12:00:00'),
      isDelivered: false,
      priceTotal: 400
    },
    {
      id: 'sdlçknjflkmn',
      title: 'Meu novo pedido 2',
      description: 'Este pedido tem como objetivo 2...',
      cliente: {
        name: 'Daniel Felizardo',
        telefone: '(83) 9 9999-99'
      },
      dateDelivere: new Date('2022-03-27 12:00:00'),
      isDelivered: true,
      priceTotal: 200
    },
    {
      id: 'sjdfgosnfdo',
      title: 'Meu novo pedido 3',
      description: 'Este pedido tem como objetivo 3...',
      cliente: {
        name: 'Letícia felizardo',
        telefone: '(83) 9 9999-99'
      },
      dateDelivere: new Date('2022-03-28 14:00:00'),
      isDelivered: null,
      priceTotal: 300
    }
  ])

  useEffect(() => {
    setOrders(orders)
  }, orders)

  return (
    <Container>
      <Header />

      <Content>
        <Wrapper>
          <h3>Meus pedidos</h3>
          <Link to="/order">Criar pedido</Link>
        </Wrapper>

        <TableList loading={false}>
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
                  <td className="center">{order.cliente.name}</td>
                  <td className="center">{formatMoney(order.priceTotal)}</td>
                  <td className="center">{formatDate(order.dateDelivere)}h</td>
                  <td className="actions">
                    <div>
                      <button
                        type="button"
                        className="finish"
                        onClick={() => {
                          console.log('Deu certo')
                        }}
                      >
                        Finalizar
                      </button>
                      <button
                        type="button"
                        className="cancel"
                        onClick={() => {
                          console.log('Deu certo')
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
