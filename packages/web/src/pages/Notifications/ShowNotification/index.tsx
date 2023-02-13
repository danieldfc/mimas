import React, { useEffect, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
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

  useEffect(() => {
    async function getNotification() {
      const response = await api.get<{ notification: Notification }>(
        `/notifications/${id}`
      )
      setNotification({ ...response.data.notification })
    }
    getNotification()
  }, [id])

  // const readNotification = useCallback(
  //   async (id: string) => {
  //     try {
  //       await read(id)
  //       addToast({
  //         type: 'success',
  //         title: 'Notificação marcada como lida',
  //         description: 'A notificação foi marcada como lida com sucesso.'
  //       })
  //     } catch (err) {
  //       addToast({
  //         type: 'error',
  //         title: 'Erro ao marcar como lida a notificação',
  //         description: 'Ocorreu um erro ao marcar como lida a notificação.'
  //       })
  //     }
  //   },
  //   [addToast, read]
  // )

  return (
    <Container>
      <Header />
      <HeaderWrapper>
        <h3>Notificação</h3>

        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
      </HeaderWrapper>

      <Content>
        <h3>{notification?.title}</h3>
        <p>{notification?.description}</p>
      </Content>
    </Container>
  )
}
