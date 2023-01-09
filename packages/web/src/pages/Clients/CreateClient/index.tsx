import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef } from 'react'
import * as Yup from 'yup'

import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { FaRegAddressCard } from 'react-icons/fa'

import { Link, useHistory } from 'react-router-dom'
import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import Input from '../../../components/Input'

import { Container, Content, HeaderWrapper } from './styles'
import removeEmptyFields from '../../../utils/removeEmptyFields'
import getValidationErrors from '../../../utils/getValidationError'
import { useToast } from '../../../hooks/toast'
import { useClient } from '../../../hooks/client'

interface IFormDataClient {
  name: string
  phone: string
  email?: string
  address?: string
}

export function CreateClient() {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { addClient } = useClient()
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

        await addClient({
          email: fields.email,
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          address: fields.address
        })

        history.push('/clients')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na criação do cliente',
          description: 'Ocorreu um erro ao criar um cliente.'
        })
      }
    },
    [addClient, addToast, history]
  )

  return (
    <Container>
      <Header />
      <HeaderWrapper>
        <h3>Criar um novo cliente</h3>

        <Link to="/clients">
          <FiArrowLeft />
          Voltar
        </Link>
      </HeaderWrapper>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Input icon={GoPerson} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="E-mail (opcional)" />
            <Input
              icon={FiPhone}
              name="phone"
              placeholder="Telefone"
              type="tel"
            />
            <Input
              icon={FaRegAddressCard}
              name="address"
              placeholder="Endereço (opcional)"
            />
          </div>
          <Button type="submit" label="little">
            Criar cliente
          </Button>
        </Form>
      </Content>
    </Container>
  )
}
