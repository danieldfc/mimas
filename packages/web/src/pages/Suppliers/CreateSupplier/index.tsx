import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef, useState } from 'react'
import { FaRegAddressCard } from 'react-icons/fa'
import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { MdVpnKey } from 'react-icons/md'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import Input from '../../../components/Input'
import SelectInput from '../../../components/SelectInput'
import { TypePix, useSupplier } from '../../../hooks/supplier'
import { useToast } from '../../../hooks/toast'
import getValidationErrors from '../../../utils/getValidationError'
import removeEmptyFields from '../../../utils/removeEmptyFields'
import { Container, Content, HeaderWrapper, WrapperPix } from './styles'
import { typesPix } from './util'

interface IFormDataSupplier {
  name: string
  phone: string
  email: string
  address: string
  phoneSecondary: string | null
  typePix: TypePix | null
  keyPix: string | null
}

export function CreateSupplier() {
  const [selectTypePix, setSelectTypePix] = useState<TypePix | null>(null)
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
          address: Yup.string().nullable(),
          phoneSecondary: Yup.string().nullable(),
          typePix: Yup.mixed<TypePix>()
            .oneOf(Object.values(TypePix))
            .nullable(),
          keyPix: Yup.string().nullable()
        })
        await schema.validate(fields, { abortEarly: false })

        await addSupplier({
          email: fields.email ?? '',
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          address: fields.address ?? '',
          keyPix: fields.keyPix ?? null,
          phoneSecondary: fields.phoneSecondary ?? null,
          typePix: selectTypePix,
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
    [addToast, history, addSupplier, selectTypePix]
  )

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Cadastrar novo fornecedor</h3>

        <Link to="/suppliers">
          <FiArrowLeft />
          Voltar
        </Link>
      </HeaderWrapper>

      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={GoPerson} name="name" placeholder="Nome" />
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiPhone}
            name="phone"
            placeholder="Telefone"
            type="tel"
          />
          <Input
            icon={FiPhone}
            name="phoneSecondary"
            placeholder="Telefone secundário (opcional)"
            type="tel"
          />
          <Input
            icon={FaRegAddressCard}
            name="address"
            placeholder="Endereço (opcional)"
          />
          <WrapperPix>
            <SelectInput
              placeholder="Selecione o tipo de pix (opcional)"
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
            <Input
              icon={MdVpnKey}
              name="keyPix"
              placeholder="Chave pix (opcional)"
            />
          </WrapperPix>
          <Button type="submit" label="little">
            Cadastrar
          </Button>
        </Form>
      </Content>
    </Container>
  )
}
