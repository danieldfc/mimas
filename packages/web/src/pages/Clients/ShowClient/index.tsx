import React, { useMemo } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { useHistory, useParams } from 'react-router-dom'
import { Header } from '../../../components/Header'
import { useClient } from '../../../hooks/client'
import { useToast } from '../../../hooks/toast'
import { Container, Content, HeaderWrapper, LinkWhatsapp } from './styles'

export function ShowClient() {
  const { clientId } = useParams<{ clientId: string }>()
  const { clients } = useClient()
  const history = useHistory()
  const { addToast } = useToast()

  const clienteSelected = useMemo(() => {
    const client = clients.find(cl => cl.id === clientId)
    if (!client) {
      history.goBack()
      addToast({
        type: 'info',
        title: `Cliente não encontrado`,
        description:
          'O cliente selecionado não foi encontrado no sistema, tente novamente.'
      })
    }

    return client
  }, [clients, clientId, addToast, history])

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Cliente - {clienteSelected?.name}</h3>

        <button type="button" onClick={history.goBack}>
          <FiArrowLeft />
          Voltar
        </button>
      </HeaderWrapper>

      <Content>
        <p>Email: {clienteSelected?.email ?? 'N/A'}</p>
        <p>Telefone: {clienteSelected?.phone ?? 'N/A'}</p>
        <p>Endereço: {clienteSelected?.address ?? 'N/A'}</p>

        {clienteSelected?.phone && (
          <LinkWhatsapp
            role="button"
            href={`https://api.whatsapp.com/send?phone=${clienteSelected?.phone}`}
            target="_blank"
            rel="noreferrer"
          >
            Enviar para o Whatsapp
          </LinkWhatsapp>
        )}
      </Content>
    </Container>
  )
}
