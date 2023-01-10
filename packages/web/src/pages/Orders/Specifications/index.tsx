import api from '@mimas/axios-config'
import React, { useCallback, useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import { useToast } from '../../../hooks/toast'
import { Order, StatusOrder } from '../../../interfaces/Order'
import { formatMoney } from '../../../utils/formatMoney'
import { MetadadoProduct } from './MetadadoOrder'
import {
  Container,
  Content,
  MetadadoProducts,
  Wrapper,
  WrapperButtons
} from './styles'

export function Specifications() {
  const { orderId } = useParams<{ orderId?: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const { addToast } = useToast()

  useEffect(() => {
    async function getOrder() {
      const response = await api.get<{ order: Order }>(`/orders/${orderId}`)
      setOrder({ ...response.data.order })
    }
    getOrder()
  }, [orderId])

  const getNamedStatusOrder = (status: StatusOrder) => {
    switch (status) {
      case 'cancel':
        return 'cancelado'
      case 'open':
        return 'aberto'
      case 'finish':
        return 'finalizado'
      default:
        break
    }
  }

  const modifyStatusOrder = useCallback(
    async (status: StatusOrder) => {
      try {
        await api.patch(`/orders/${orderId}`, {
          status
        })
        const response = await api.get(`/orders/${orderId}`)
        setOrder({ ...response.data.order })
        const statusName = getNamedStatusOrder(status)

        addToast({
          type: 'success',
          title: 'Status atualizado',
          description: `O status do pedido foi atualizado para "${statusName}" com sucesso!`
        })
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Error ao atualizar status do pedido',
          description: `Ocorreu um erro ao atualizar status do pedido!`
        })
      }
    },
    [orderId, addToast]
  )

  return (
    <Container>
      <Header />

      <Wrapper>
        <h3>Especificações do pedido</h3>
        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
      </Wrapper>

      <Content>
        {order ? (
          <>
            <WrapperButtons>
              {order.status === 'open' ? (
                <>
                  <Button
                    type="button"
                    label="small"
                    typeButton="finish"
                    onClick={() => modifyStatusOrder('finish')}
                  >
                    Finalizar
                  </Button>
                  <Button
                    type="button"
                    label="small"
                    typeButton="cancel"
                    onClick={() => modifyStatusOrder('cancel')}
                  >
                    Cancelar
                  </Button>
                </>
              ) : (
                <Button
                  type="button"
                  label="small"
                  typeButton="open"
                  onClick={() => modifyStatusOrder('open')}
                >
                  Reabrir
                </Button>
              )}
            </WrapperButtons>

            <h2>
              <div>
                {order.title}
                <Link to={`/clients/${order.clients[0]?.id}`}>
                  {order.clients[0]?.name ?? 'N/A'}
                </Link>
              </div>
              {formatMoney(parseFloat(order.finalPrice.replace('$', '')))}
            </h2>
            <p>Descrição do pedido: {order.description}</p>

            <MetadadoProducts>
              {order.metadado.map((product, index) => (
                <MetadadoProduct
                  product={product}
                  key={product.id}
                  index={index}
                />
              ))}
              <li>
                <h4>Mão de obra - {formatMoney(order.workmanship)}</h4>
              </li>
            </MetadadoProducts>
          </>
        ) : (
          <h2>Produto selecionado não existe :(</h2>
        )}
      </Content>
    </Container>
  )
}
