import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import { MdVpnKey } from 'react-icons/md'
import { useHistory, useParams } from 'react-router-dom'
import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import Input from '../../../components/Input'
import SelectInput from '../../../components/SelectInput'
import { Employee, useEmployee } from '../../../hooks/employee'
import { useToast } from '../../../hooks/toast'
import { api } from '../../../services/api'
import { TypePix } from '../../../utils/enum'
import { typesPix } from '../../../utils/typesPix'
import {
  Container,
  Content,
  HeaderWrapper,
  LinkWhatsapp,
  WrapperButton,
  WrapperPix
} from './styles'
import removeEmptyFields from '../../../utils/removeEmptyFields'
import getValidationErrors from '../../../utils/getValidationError'

type ParamShowEmployee = {
  id: string
}

type IFormDataEmployeeUpdate = {
  name: string
  email?: string
  phone: string
  typePix: TypePix
  keyPix: string
}

export default function ShowEmployee() {
  const formRef = useRef<FormHandles>(null)
  const { id } = useParams<ParamShowEmployee>()
  const history = useHistory()
  const { addToast } = useToast()
  const [selectTypePix, setSelectTypePix] = useState<TypePix | null>(null)
  const { updateEmployee, employees, deleteEmployee } = useEmployee()

  const employee = useMemo<Employee | undefined>(
    () => employees.find(cl => cl.id === id),
    [employees, id]
  )

  useEffect(() => {
    async function getEmployee() {
      const response = await api.get<{ employee: Employee }>(`/employees/${id}`)

      if (!response) {
        addToast({
          type: 'info',
          title: 'Prestador de serviço não encontrado',
          description:
            'Ocorreu um erro ao tentar buscar o prestador de serviço, tente mais tarde.'
        })
        setTimeout(() => {
          history.goBack()
        }, 2000)
      } else {
        setSelectTypePix(response.data.employee.typePix)
      }
    }
    getEmployee()
  }, [id, history, addToast])

  const handleSubmit = useCallback(
    async (data: IFormDataEmployeeUpdate) => {
      const fields = removeEmptyFields<IFormDataEmployeeUpdate>({
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

        await updateEmployee(id, {
          email: fields.email ?? '',
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          keyPix: fields.keyPix ?? '',
          typePix: selectTypePix as TypePix
        })

        addToast({
          type: 'success',
          title: 'Informações do prestador de serviço atualizado',
          description:
            'As informações do prestador de serviço foram atualizadas com sucesso.'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do prestador de serviço',
          description:
            'Ocorreu um erro ao atualizar um prestador de serviço, tente novamente mais tarde.'
        })
      }
    },
    [updateEmployee, addToast, id, selectTypePix]
  )

  const handleDeleteSubmit = useCallback(async () => {
    try {
      await deleteEmployee(id)

      addToast({
        type: 'success',
        title: 'Prestador de serviço deletado',
        description: 'Prestador de serviço deletado com sucesso.'
      })
      history.push('/employees')
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao deletar prestador de serviço',
        description:
          'Ocorreu um erro ao deletar um prestador de serviço, tente novamente mais tarde.'
      })
    }
  }, [id, deleteEmployee, addToast, history])

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <h3>Prestador de serviço</h3>

        <button type="button" onClick={history.goBack}>
          <FiArrowLeft />
          Voltar
        </button>
      </HeaderWrapper>

      <Content>
        <Button type="button" label="small" onClick={handleDeleteSubmit}>
          Excluir prestador de serviço
        </Button>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input
            icon={GoPerson}
            name="name"
            placeholder="Nome"
            defaultValue={employee?.name}
          />
          <Input
            icon={FiMail}
            name="email"
            placeholder="E-mail (opcional)"
            defaultValue={employee?.email}
          />
          <Input
            icon={FiPhone}
            name="phone"
            placeholder="Telefone"
            type="tel"
            defaultValue={employee?.phone}
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
            <Input
              icon={MdVpnKey}
              name="keyPix"
              placeholder="Chave PIX"
              defaultValue={employee?.keyPix}
            />
          </WrapperPix>
          <WrapperButton>
            <Button type="submit" label="little">
              Editar
            </Button>

            <LinkWhatsapp
              role="button"
              href={`https://wa.me/${employee?.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noreferrer"
            >
              Enviar para Whatsapp
            </LinkWhatsapp>
          </WrapperButton>
        </Form>
      </Content>
    </Container>
  )
}
