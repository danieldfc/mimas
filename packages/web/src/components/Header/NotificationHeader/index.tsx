import React, { useCallback } from 'react'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useNotification } from '../../../hooks/notification'
import { padStart } from '../../../utils/formatDate'
import {
  ButtonIcon,
  Container,
  Content,
  NotExistNotification,
  Wrapper
} from './styles'

type NotificationHeaderProps = {
  isOpenNotification: boolean
  onClick: () => void
}

export default function NotificationHeader({
  isOpenNotification = false,
  onClick
}: NotificationHeaderProps) {
  const { notifications, readAll } = useNotification()

  const parseData = useCallback((date: string) => {
    const [data, horario] = date.split('T')
    const [ano, mes, dia] = data.split('-')
    const [, minuto] = horario.split(':')

    return `${dia}/${mes}/${ano} ${padStart(
      String(new Date(date).getHours()),
      2,
      '0'
    )}:${minuto}`
  }, [])

  const checkeNotifications = useCallback(() => {
    if (notifications.filter(n => !n.isReaded).length) {
      readAll()
    }
  }, [notifications, readAll])

  return (
    <Container>
      <ButtonIcon
        isOpen={isOpenNotification}
        hasNotification={!!notifications.filter(n => !n.isReaded).length}
        onClick={onClick}
      >
        <MdOutlineNotificationsNone />
      </ButtonIcon>
      {isOpenNotification && (
        <Wrapper isOpen={isOpenNotification}>
          <header>
            <span>Notificações</span>
            <button type="button" onClick={checkeNotifications}>
              Marcar todas como lidas
            </button>
          </header>
          <Content>
            {notifications.filter(n => !n.isReaded).length ? (
              notifications
                .filter(n => !n.isReaded)
                .map(n => (
                  <a key={n.id} href={`/notifications/${n.id}`}>
                    <h3>{n.title}</h3>
                    <p>{n.description}</p>
                    <small>{parseData(n.createdAt)}h</small>
                  </a>
                ))
            ) : (
              <NotExistNotification>
                <p>Ainda não tem nada por aqui.</p>
              </NotExistNotification>
            )}
          </Content>
          <Link to="/notifications">Ver todas</Link>
        </Wrapper>
      )}
    </Container>
  )
}
