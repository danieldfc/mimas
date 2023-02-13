import React, { useCallback, useMemo, useState } from 'react'
import { MdOutlineNotificationsNone } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useNotification } from '../../../hooks/notification'
import {
  ButtonIcon,
  Container,
  Content,
  NotExistNotification,
  // NotExistNotification,
  Wrapper
} from './styles'

export default function NotificationHeader() {
  const [isOpenNotification, setIsOpenNotification] = useState(false)
  const { notifications, readAllNotifications } = useNotification()

  const parseData = useCallback((date: string) => {
    const [data, horario] = date.split('T')
    const [ano, mes, dia] = data.split('-')
    const [hora, minuto] = horario.split(':')

    return `${dia}/${mes}/${ano} ${hora}:${minuto}`
  }, [])

  const notificationsData = useMemo(() => {
    return notifications.filter(n => !n.isReaded)
  }, [notifications])

  const hasNotificationsNotRead = useMemo(() => {
    return isOpenNotification && !!notifications.filter(n => !n.isReaded).length
  }, [isOpenNotification, notifications])

  return (
    <Container>
      <ButtonIcon
        isOpen={isOpenNotification}
        hasNotification={hasNotificationsNotRead}
        onClick={() => setIsOpenNotification(!isOpenNotification)}
      >
        <MdOutlineNotificationsNone />
      </ButtonIcon>
      {isOpenNotification && (
        <Wrapper>
          <header>
            <span>Notificações</span>
            <button
              type="button"
              onClick={() => {
                if (notificationsData.length) {
                  readAllNotifications()
                }
              }}
            >
              Marcar todas como lidas
            </button>
          </header>
          <Content>
            {notificationsData.length ? (
              notificationsData.map(n => (
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
