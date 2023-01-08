import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Container, Content, Wrapper } from './styles'
import { formatMoney } from '../../utils/formatMoney'

import { Header } from '../../components/Header'
import TableList from '../../components/TableList'
import api from '@mimas/axios-config'
import { Client } from '../../hooks/client'
import { useToast } from '../../hooks/toast'

export type StatusOrder = 'finish' | 'cancel' | 'open'

export interface IProductMerged {
  id: string
  title: string
  description: string
  price: number
  qtd: number
}

export type Order = {
  id: string
  title: string
  finalPrice: string
  description: string
  deliveryAt: string
  clients: Client[]
  createdAt: Date
  status: StatusOrder
  metadado: IProductMerged[]
  workmanship: number
}

export default function Dashboard() {
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

    return `${dia}-${mes}-${ano} ${hora}:${minuto}`
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
                <th className="center"> DATA DA ENTREGA </th>
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
      </Content>
    </Container>
  )
}
