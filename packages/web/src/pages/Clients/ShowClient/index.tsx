import { Form } from '@unform/web'
import React, { useCallback, useMemo, useRef } from 'react'
import { FaRegAddressCard } from 'react-icons/fa'
import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import Input from '../../../components/Input'
import { Client, useClient } from '../../../hooks/client'
import { useToast } from '../../../hooks/toast'
import {
  Container,
  Content,
  HeaderWrapper,
  LinkWhatsapp,
  WrapperButton
} from './styles'
import * as Yup from 'yup'
import { FormHandles } from '@unform/core'
import removeEmptyFields from '../../../utils/removeEmptyFields'
import getValidationErrors from '../../../utils/getValidationError'

type IFormDataClient = {
  name: string
  email: string
  address: string
  phone: string
}

export function ShowClient() {
  const { clientId } = useParams<{ clientId: string }>()
  const { clients, updateClient, deleteClient } = useClient()
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const client = useMemo<Client | undefined>(
    () => clients.find(cl => cl.id === clientId),
    [clients, clientId]
  )

  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: IFormDataClient) => {
      const fields = removeEmptyFields<IFormDataClient>(data)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email('Digite um e-mail válido').nullable(),
          phone: Yup.string().required('Telefone obrigatório'),
          address: Yup.string().nullable()
        })
        await schema.validate(fields, { abortEarly: false })

        await updateClient(clientId, {
          email: fields.email,
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          address: fields.address
        })

        addToast({
          type: 'success',
          title: 'Cliente atualizado',
          description: 'Informações do cliente atualizado com sucesso.'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do cliente',
          description: 'Ocorreu um erro ao atualizar um cliente.'
        })
      }
    },
    [updateClient, addToast, clientId]
  )

  const handleDeleteSubmit = useCallback(async () => {
    try {
      await deleteClient(clientId)

      addToast({
        type: 'success',
        title: 'Cliente deletado',
        description: 'Cliente deletado com sucesso.'
      })
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro na deletar cliente',
        description: 'Ocorreu um erro ao deletar um cliente.'
      })
    } finally {
      history.push('/clients')
    }
  }, [deleteClient, addToast, clientId, history])

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Cliente</h3>

        <button type="button" onClick={history.goBack}>
          <FiArrowLeft />
          Voltar
        </button>
      </HeaderWrapper>

      <Content>
        <Button type="button" label="small" onClick={handleDeleteSubmit}>
          Excluir cliente
        </Button>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Input
              icon={GoPerson}
              name="name"
              placeholder="Nome"
              defaultValue={client?.name}
            />
            <Input
              icon={FiMail}
              name="email"
              placeholder="E-mail (opcional)"
              defaultValue={client?.email}
            />
            <Input
              icon={FiPhone}
              name="phone"
              placeholder="Telefone"
              type="tel"
              defaultValue={client?.phone}
            />
            <Input
              icon={FaRegAddressCard}
              name="address"
              placeholder="Endereço (opcional)"
              defaultValue={client?.address}
            />
          </div>
          <WrapperButton>
            <Button type="submit" label="little">
              Editar
            </Button>

            {client?.phone && (
              <LinkWhatsapp
                role="button"
                href={`https://wa.me/${client.phone.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
              >
                Enviar para Whatsapp
              </LinkWhatsapp>
            )}
          </WrapperButton>
        </Form>
      </Content>
    </Container>
  )
}
