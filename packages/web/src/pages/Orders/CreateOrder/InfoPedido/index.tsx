import React, { useCallback, useMemo } from 'react'
import { Form } from '@unform/web'
import {
  MdDateRange,
  MdDescription,
  MdOutlinePriceCheck,
  MdTimer,
  MdTitle
} from 'react-icons/md'
import { isAfter } from 'date-fns'
import * as Yup from 'yup'
import { useHistory } from 'react-router-dom'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import SelectInput from '../../../../components/SelectInput'
import { Product } from '../../../../interfaces/Product'
import { api } from '../../../../services/api'
import { padStart } from '../../../../utils/formatDate'
import getValidationErrors from '../../../../utils/getValidationError'
import { useToast } from '../../../../hooks/toast'
import { useClient } from '../../../../hooks/client'
import { FormHandles } from '@unform/core'
import { Container, WrapperDate } from './styles'

type IFormDataOrder = {
  title: string
  description?: string
  deliveryDate: string
  deliveryTime: string
  workmanship: number
  clientId: string
  products: Product[]
}

type Props = {
  clientsId: string[]
  setClientsId: React.Dispatch<React.SetStateAction<string[]>>
  changeValueMaoObra: () => void
  products: Product[]
  formRef: React.RefObject<FormHandles>
}

export default function InfoPedido({
  clientsId,
  setClientsId,
  changeValueMaoObra,
  products,
  formRef
}: Props) {
  const { clients } = useClient()
  const history = useHistory()
  const { addToast } = useToast()

  const minDateNow = useMemo(() => {
    const now = new Date()
    const month = padStart(String(now.getMonth() + 1), 2, '0')
    const day = padStart(String(now.getDate()), 2, '0')
    return `${now.getFullYear()}-${month}-${day}`
  }, [])

  const handleSubmit = useCallback(
    async (data: IFormDataOrder) => {
      try {
        formRef.current?.setErrors({})

        const produtos = products
          .filter(p => p.add === true)
          .reduce((acc: any, item: Product) => {
            return [
              ...acc,
              {
                productId: item.id,
                qtd: item.qtd
              }
            ]
          }, [])

        if (!data.deliveryDate || !data.deliveryTime) {
          addToast({
            type: 'error',
            title: 'Data e horário de entrega obrigatório',
            description:
              'Informe uma data e horário de entrega, e tente novamente.'
          })
          return
        }

        if (
          !isAfter(
            new Date(`${data.deliveryDate}T${data.deliveryTime}:00`),
            new Date()
          )
        ) {
          addToast({
            type: 'error',
            title: 'Data e horário de entrega',
            description:
              'Informe uma data e horário de entrega no futuro, e tente novamente.'
          })
          return
        }

        const order = {
          title: data.title,
          description: data.description,
          deliveryAt: new Date(
            `${data.deliveryDate}T${data.deliveryTime}:00-00:00`
          ).toISOString(),
          clientsId,
          metadado: produtos,
          workmanship: +data.workmanship
        }

        const schema = Yup.object().shape({
          clientsId: Yup.array()
            .of(Yup.string().uuid())
            .required('Selecione pelo menos 1 cliente'),
          metadado: Yup.array()
            .min(1, 'Adicione pelo menos 1 produto')
            .required('Produtos obrigatórios'),
          workmanship: Yup.number().min(
            1,
            'Preço de mão de obra é obrigatório'
          ),
          title: Yup.string().required('Título é obrigatório'),
          description: Yup.string().notRequired(),
          deliveryAt: Yup.date()
            .typeError('Esperado que digite a data acima da data presente.')
            .required('Data de entrega é obrigatória')
        })

        await schema.validate(order, { abortEarly: false })

        await api.post('/orders', order)

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)
          console.log(errors)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na criação de pedido',
          description: 'Ocorreu um erro ao criar pedido, Tente novamente.'
        })
      }
    },
    [clientsId, addToast, history, products, formRef]
  )

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleSubmit} id="form-create-order">
        <SelectInput
          itens={clients.map(p => ({ label: p.name, value: p.id }))}
          onChange={(event: any) => {
            if (event?.length) {
              setClientsId(() => [...event.map((e: any) => e.value)])
            } else {
              setClientsId([])
            }
          }}
          placeholder="Selecione um cliente..."
          title="Clientes"
          id="form-client-id"
          name="clientId"
          isClearable
          isMulti
          noOptionsMessage={() => 'Nenhum cliente encontrado'}
        />

        <Input
          icon={MdTitle}
          name="title"
          placeholder="Título"
          disabled={!clientsId.length}
        />
        <Input
          icon={MdDescription}
          name="description"
          placeholder="Descrição"
          disabled={!clientsId.length}
        />
        <Input
          icon={MdOutlinePriceCheck}
          name="workmanship"
          placeholder="Preço de mão de obra"
          type="number"
          onChange={changeValueMaoObra}
          disabled={!clientsId.length}
          min="1"
        />
        <WrapperDate>
          <Input
            icon={MdDateRange}
            name="deliveryDate"
            placeholder="Data de entrega"
            type="date"
            min={minDateNow}
            disabled={!clientsId.length}
          />
          <Input
            icon={MdTimer}
            name="deliveryTime"
            placeholder="Horário de entrega"
            type="time"
            disabled={!clientsId.length}
          />
        </WrapperDate>

        <Button type="submit" label="little" disabled={!clientsId.length}>
          Cadastrar pedido
        </Button>
      </Form>
    </Container>
  )
}
