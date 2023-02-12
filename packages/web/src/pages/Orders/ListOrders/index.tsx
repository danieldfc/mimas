import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Container,
  ContainerWithoutOrder,
  Content,
  HeaderWrapper
} from './styles'

import { Header } from '../../../components/Header'
import TableList from '../../../components/TableList'
import { api } from '../../../services/api'
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
        setOrders(oldOrders => {
          const findIndexOrder = oldOrders.findIndex(old => old.id === orderId)
          if (findIndexOrder >= 0) {
            oldOrders[findIndexOrder].status = status
          }
          return oldOrders
        })
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
        <Link to="/create-order">Cadastrar novo pedido</Link>
      </HeaderWrapper>

      <Content>
        {orders.length ? (
          <TableList>
            <thead>
              <tr>
                <th> PEDIDO </th>
                <th className="center"> CLIENTE(S) </th>
                <th className="center"> ENTREGA </th>
                <th className="center"> AÇÕES </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>
                    <Link to={`/orders/${order.id}`}>{order.title}</Link>
                  </td>
                  <td className="center">
                    {order.clients.length
                      ? order.clients.map((client, index) => (
                          <div key={client.id}>
                            <Link to={`/clients/${client.id ?? ''}`}>
                              {client.name.split(' ')[0]}
                            </Link>
                            {index !== order.clients.length - 1 ? ' | ' : ''}
                          </div>
                        ))
                      : 'N/A'}
                  </td>
                  <td className="center">
                    {order.deliveryAt ? parseData(order.deliveryAt) : '-'}h
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
          </TableList>
        ) : (
          <ContainerWithoutOrder>
            Você não possui pedidos cadastrados
          </ContainerWithoutOrder>
        )}
      </Content>
    </Container>
  )
}
