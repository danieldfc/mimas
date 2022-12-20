import React, { useCallback, useRef } from 'react'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { FiArrowLeft, FiMail } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { AiFillContacts } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
import { Header } from '../../components/Header'
import Input from '../../components/Input'
import { Container, Content, HeaderWrapper } from './styles'
import { useAuth } from '../../hooks/auth'
import getValidationErrors from '../../utils/getValidationError'
import removeEmptyFields from '../../utils/removeEmptyFields'
import { useToast } from '../../hooks/toast'
import api from '@mimas/axios-config'

type IFormDataProfile = {
  name?: string
  email?: string
  nick?: string
}

export default function Profile() {
  const formRef = useRef<FormHandles>(null)
  const { user, updateUser } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async data => {
      const fields = removeEmptyFields<IFormDataProfile>(data)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().nullable(),
          nick: Yup.string().nullable(),
          email: Yup.string().email('Digite um e-mail válido').nullable()
        })
        await schema.validate(fields, { abortEarly: false })

        await api.put(`/users/${user.id}`, {
          email: fields.email,
          name: fields.name,
          nick: fields.nick
        })

        Object.assign(user, fields)

        updateUser(user)

        addToast({
          type: 'success',
          title: 'Atualização de Perfil',
          description: 'Perfil atualizado com sucesso.'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização de perfil',
          description:
            'Ocorreu um erro ao atualizar perfil, recarregue a página.'
        })
      }
    },
    [user, addToast, updateUser]
  )

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Profile</h3>

        <Link to="/dashboard" about="Voltar">
          <FiArrowLeft />
          Voltar
        </Link>
      </HeaderWrapper>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Input icon={GoPerson} name="name" placeholder="Nome (opcional)" />
            <Input
              icon={AiFillContacts}
              name="nick"
              placeholder="Nickname (opcional)"
            />
            <Input icon={FiMail} name="email" placeholder="E-mail (opcional)" />
          </div>
          <Button type="submit" label="little">
            Atualizar perfil
          </Button>
        </Form>
      </Content>
    </Container>
  )
}