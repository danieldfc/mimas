import React, { useCallback } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import { Header } from '../../../components/Header'
import { useNotification } from '../../../hooks/notification'
import { useToast } from '../../../hooks/toast'
import {
  Container,
  ContainerWithoutNotification,
  Content,
  HeaderWrapper,
  NotificationItem
} from './styles'

export default function ListNotifications() {
  const { notifications, read } = useNotification()
  const { addToast } = useToast()
  const history = useHistory()

  const readNotification = useCallback(
    async (id: string) => {
      try {
        await read(id)
        addToast({
          type: 'success',
          title: 'Notificação marcada como lida',
          description: 'A notificação foi marcada como lida com sucesso.'
        })
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao marcar como lida a notificação',
          description: 'Ocorreu um erro ao marcar como lida a notificação.'
        })
      }
    },
    [addToast, read]
  )

  return (
    <Container>
      <Header />
      <HeaderWrapper>
        <h3>Notificações</h3>

        <button type="button" onClick={history.goBack}>
          <FiArrowLeft />
          Voltar
        </button>
      </HeaderWrapper>

      <Content>
        {notifications.length ? (
          notifications.map(n => (
            <NotificationItem key={n.id} isReaded={n.isReaded}>
              <div>
                <h3>
                  <a href={`/notifications/${n.id}`}>{n.title}</a>{' '}
                  {n.url && <a href={n.url}>- Acesse o link</a>}
                </h3>
                <p>{n.description}</p>
              </div>
              {!n.isReaded && (
                <button type="button" onClick={() => readNotification(n.id)}>
                  Marcar como lida
                </button>
              )}
            </NotificationItem>
          ))
        ) : (
          <ContainerWithoutNotification>
            Não existe notificações cadastradas
          </ContainerWithoutNotification>
        )}
      </Content>
    </Container>
  )
}
