import { FormHandles, FormHelpers } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef, useState } from 'react'
import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { MdVpnKey } from 'react-icons/md'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import Input from '../../../components/Input'
import SelectInput from '../../../components/SelectInput'
import { TypePix } from '../../../utils/enum'
import getValidationErrors from '../../../utils/getValidationError'
import { typesPix } from '../../../utils/typesPix'
import { Container, Content, HeaderWrapper, WrapperPix } from './styles'
import { useEmployee } from '../../../hooks/employee'
import { useToast } from '../../../hooks/toast'
import removeEmptyFields from '../../../utils/removeEmptyFields'

interface IFormDataEmployee {
  name: string
  email?: string
  phone: string
  keyPix: string
  typePix: TypePix
}

export default function CreateEmployee() {
  const formRef = useRef<FormHandles>(null)
  const [selectTypePix, setSelectTypePix] = useState<TypePix | null>(null)

  const { addEmployee } = useEmployee()
  const { addToast } = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: IFormDataEmployee, { reset }: FormHelpers) => {
      const fields = removeEmptyFields<IFormDataEmployee>({
        ...data,
        typePix: selectTypePix
      })
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().email('Digite um e-mail válido'),
          phone: Yup.string().required('Telefone obrigatório'),
          typePix: Yup.mixed<TypePix>()
            .oneOf(Object.values(TypePix))
            .required('Tipo de PIX obrigatório'),
          keyPix: Yup.string().required('Chave PIX obrigatória')
        })
        await schema.validate(fields, { abortEarly: false })

        await addEmployee({
          email: fields.email ?? '',
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          keyPix: fields.keyPix ?? '',
          typePix: selectTypePix as TypePix
        })

        history.push('/employees')

        reset()
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
    [addToast, addEmployee, history, selectTypePix]
  )

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Cadastrar prestador de serviço</h3>
        <Link to="/employees">
          <FiArrowLeft />
          Voltar
        </Link>
      </HeaderWrapper>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={GoPerson} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail (opcional)" />
          <Input
            icon={FiPhone}
            name="phone"
            placeholder="Telefone"
            type="tel"
          />
          <WrapperPix>
            <SelectInput
              placeholder="Selecione o tipo de PIX"
              onChange={(newValue: any) =>
                setSelectTypePix(newValue?.value ?? null)
              }
              itens={typesPix}
              title="Tipo"
              id="form-type-pix"
              name="typePix"
              isClearable
              noOptionsMessage={() => 'Nenhum tipo cadastrado'}
              hasLabel={false}
              value={typesPix.find(t => t.value === selectTypePix)}
            />
            <Input icon={MdVpnKey} name="keyPix" placeholder="Chave PIX" />
          </WrapperPix>
          <Button type="submit" label="little">
            Criar prestador de serviço
          </Button>
        </Form>
      </Content>
    </Container>
  )
}
