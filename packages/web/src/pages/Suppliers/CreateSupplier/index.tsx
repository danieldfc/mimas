import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef } from 'react'
import { FaRegAddressCard } from 'react-icons/fa'
import { FiMail, FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import Input from '../../../components/Input'
import { useSupplier } from '../../../hooks/supplier'
import { useToast } from '../../../hooks/toast'
import getValidationErrors from '../../../utils/getValidationError'
import removeEmptyFields from '../../../utils/removeEmptyFields'
import { Container, Content } from './styles'

interface IFormDataSupplier {
  name: string
  phone: string
  email: string
  address: string
}

export function CreateSupplier() {
  const formRef = useRef<FormHandles>(null)
  const { addSupplier } = useSupplier()
  const history = useHistory()
  const { addToast } = useToast()

  const handleSubmit = useCallback(
    async (data: IFormDataSupplier) => {
      const fields = removeEmptyFields<IFormDataSupplier>(data)
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
          address: Yup.string().nullable()
        })
        await schema.validate(fields, { abortEarly: false })

        await addSupplier({
          email: fields.email ?? '',
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          address: fields.address ?? '',
          products: []
        })

        history.push('/suppliers')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na criação do fornecedor',
          description: 'Ocorreu um erro ao criar um fornecedor.'
        })
      }
    },
    [addToast, history, addSupplier]
  )

  return (
    <Container>
      <Header />

      <Content>
        <h2>Cadastrar novo fornecedor</h2>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <Input icon={GoPerson} name="name" placeholder="Nome" />
            <Input icon={FiMail} name="email" placeholder="E-mail" />
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
            Cadastrar
          </Button>
        </Form>
      </Content>
    </Container>
  )
}
