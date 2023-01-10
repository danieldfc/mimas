import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  ContainerWithoutOrder,
  Content,
  HeaderWrapper
} from './styles'
import { formatMoney } from '../../../utils/formatMoney'

import { Header } from '../../../components/Header'
import TableList from '../../../components/TableList'
import api from '@mimas/axios-config'
import { useToast } from '../../../hooks/toast'
import { Order, StatusOrder } from '../../../interfaces/Order'

export default function ListOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const { addToast } = useToast()

  useEffect(() => {
    async function getOrders() {
      const response = await api.get('/orders')
      setOrders([...response.data.orders])
    }
    getOrders()
  }, [])

  const parseData = useCallback((date: string) => {
    const [data, horario] = date.split('T')
    const [ano, mes, dia] = data.split('-')
    const [hora, minuto] = horario.split(':')

    return `${dia}/${mes}/${ano} ${hora}:${minuto}`
  }, [])

  const finalizarCancelarPedido = useCallback(
    async (orderId: string, status: StatusOrder = 'open') => {
      try {
        await api.patch(`/orders/${orderId}`, {
          status
        })
        const response = await api.get('/orders')
        setOrders([...response.data.orders])
        const statusName = status === 'finish' ? 'finalizado' : 'cancelado'

        addToast({
          type: 'success',
          title: 'Status atualizado',
          description: `O pedido foi ${statusName} com sucesso!`
        })
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error ao atualizar status do pedido',
          description: `Ocorreu um erro ao atualizar status do pedido!`
        })
      }
    },
    [addToast]
  )

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Meus pedidos</h3>
        <Link to="/order">Cadastrar novo pedido</Link>
      </HeaderWrapper>

      <Content>
        {!orders.length ? (
          <ContainerWithoutOrder>
            Você não possui pedidos cadastrados
          </ContainerWithoutOrder>
        ) : (
          <TableList>
            <>
              <thead>
                <tr>
                  <th> PEDIDO </th>
                  <th className="center"> CLIENTE </th>
                  <th className="center"> PREÇO </th>
                  <th className="center"> ENTREGA </th>
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
                    <td className="center">
                      <Link to={`/clients/${order.clients[0].id}`}>
                        {order.clients[0].name}
                      </Link>
                    </td>
                    <td className="center">
                      {formatMoney(
                        +order.finalPrice.replace('$', '').replace(',', '')
                      )}
                    </td>
                    <td className="center">
                      {order.deliveryAt ? parseData(order.deliveryAt) : '-'}h
                      {/* TODO - deveria ser a data de entrega do produto */}
                    </td>
                    <td className="actions">
                      <div>
                        {order.status === 'open' ? (
                          <>
                            <button
                              type="button"
                              className="finish"
                              onClick={() =>
                                finalizarCancelarPedido(order.id, 'finish')
                              }
                            >
                              Finalizar
                            </button>
                            <button
                              type="button"
                              className="cancel"
                              onClick={() =>
                                finalizarCancelarPedido(order.id, 'cancel')
                              }
                            >
                              Cancelar
                            </button>
                          </>
                        ) : order.status === 'cancel' ? (
                          <strong className="cancel">Cancelado</strong>
                        ) : (
                          <strong className="finish">Finalizado</strong>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </>
          </TableList>
        )}
      </Content>
    </Container>
  )
}
