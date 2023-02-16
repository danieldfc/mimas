import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef } from 'react'
import { FiLock, FiMail } from 'react-icons/fi'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'

import Button from '../../../components/Button'
import Input from '../../../components/Input'

import { useAuth } from '../../../hooks/auth'
import { useToast } from '../../../hooks/toast'

import LogoImg from '../../../assets/logo.png'

import getValidationErrors from '../../../utils/getValidationError'
import { Container, Content, Header, Separator, WrapperArticle } from './styles'

interface SignInFormData {
  email: string
  password: string
}

export default function SignIn() {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const { signIn } = useAuth()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória')
        })
        await schema.validate(data, { abortEarly: false })

        await signIn({
          email: data.email,
          password: data.password
        })

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description: 'Ocorreu um erro ao fazer login, cheque as credências.'
        })
      }
    },
    [signIn, addToast, history]
  )

  return (
    <Container>
      <Content>
        <WrapperArticle className="login-left">
          <Header>
            <h1>Seja bem vindo</h1>
            <p>Por favor, faça o login para usar a plataforma</p>
          </Header>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              icon={FiMail}
              label="Enter Email"
              name="email"
              placeholder="E-mail"
            />

            <Input
              label="Enter Password"
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Senha"
            />

            <Button type="submit" label="little">
              Entrar
            </Button>
            {/* <Link to="/forgot-password">Esqueci minha senha</Link> */}
          </Form>
        </WrapperArticle>
        <Separator />
        <WrapperArticle className="login-right">
          <img src={LogoImg} alt="Dacia Bordados" />
        </WrapperArticle>
      </Content>
    </Container>
  )
}
