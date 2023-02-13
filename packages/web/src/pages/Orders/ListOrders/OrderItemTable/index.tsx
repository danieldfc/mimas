import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useToast } from '../../../../hooks/toast'
import { Order, StatusOrder } from '../../../../interfaces/Order'
import { api } from '../../../../services/api'

type OrderItemTableProps = {
  order: Order
  key: string
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>
}

export default function OrderItemTable({
  order,
  setOrders
}: OrderItemTableProps) {
  const { addToast } = useToast()

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
    [addToast, setOrders]
  )

  return (
    <tr>
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
                onClick={() => finalizarCancelarPedido(order.id, 'finish')}
              >
                Finalizar
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => finalizarCancelarPedido(order.id, 'cancel')}
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
  )
}
