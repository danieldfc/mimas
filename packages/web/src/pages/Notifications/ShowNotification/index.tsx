import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router-dom'
import { Header } from '../../../components/Header'
import { Notification } from '../../../hooks/notification'
import { api } from '../../../services/api'

import { Container, Content, HeaderWrapper } from './styles'

type ParamOption = {
  id: string
}

export default function ShowNotification() {
  const { id }: ParamOption = useParams()
  const [notification, setNotification] = useState<Notification | null>(null)
  const history = useHistory()

  useEffect(() => {
    async function getNotification() {
      const response = await api.get<{ notification: Notification }>(
        `/notifications/${id}`
      )
      setNotification({ ...response.data.notification })
    }
    getNotification()
  }, [id])

  return (
    <Container>
      <Header />
      <HeaderWrapper>
        <h3>Notificação</h3>

        <button type="button" onClick={history.goBack}>
          <FiArrowLeft />
          Voltar
        </button>
      </HeaderWrapper>

      <Content>
        <h3>{notification?.title}</h3>
        <p>{notification?.description}</p>
      </Content>
    </Container>
  )
}
