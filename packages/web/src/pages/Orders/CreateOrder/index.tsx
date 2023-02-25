import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import { isAfter } from 'date-fns'
import { api } from '../../../services/api'

import {
  MdDateRange,
  MdDescription,
  MdOutlinePriceCheck,
  MdTimer,
  MdTitle
} from 'react-icons/md'
import { FiArrowLeft } from 'react-icons/fi'

import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import Input from '../../../components/Input'
import { useClient } from '../../../hooks/client'

import { CardListProducts } from '../../../components/CardListProducts'
import SelectInput from '../../../components/SelectInput'
import ModalRender from '../../../components/Modal'
import { useToast } from '../../../hooks/toast'
import getValidationErrors from '../../../utils/getValidationError'
import ListProductsAdd from '../../../components/ListProductsAdded'
import { Product } from '../../../interfaces/Product'

import {
  Container,
  Content,
  HeaderWrapper,
  InfoPedido,
  WrapperContent,
  WrapperDate
} from './styles'
import { padStart } from '../../../utils/formatDate'

type IFormDataOrder = {
  title: string
  description?: string
  deliveryDate: string
  deliveryTime: string
  workmanship: number
  clientId: string
  products: Product[]
}

export function CreateOrder() {
  const { clients } = useClient()
  const history = useHistory()
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [precoTotal, setPrecoTotal] = useState(0)
  const [clientsId, setClientsId] = useState<string[]>([])
  const [products, setProducts] = useState<Product[]>([])

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
  }, [])

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
    [clientsId, addToast, history, products]
  )

  const productsAdded = products.filter(p => p.add)

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('/products')
      setProducts([
        ...response.data.products.map((p: Product) => ({
          ...p,
          add: false,
          qtd: 0
        }))
      ])
    }
    getProducts()
  }, [])

  const changeValueMaoObra = useCallback(() => {
    const precoMaoObra = +formRef.current?.getData().workmanship
    const totalProdutos = products.reduce((acc, p) => {
      if (p.add) acc += +p.price.replace('$', '') * p.qtd
      return acc
    }, 0)
    return setPrecoTotal(totalProdutos + precoMaoObra)
  }, [products])

  return (
    <Container>
      <Header />
      <HeaderWrapper>
        <h3>Criar um novo pedido</h3>

        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
      </HeaderWrapper>

      <h3>Total do pedido: R$ {precoTotal}</h3>

      <Content>
        <InfoPedido>
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

            <ModalRender
              isOpen={modalIsOpen}
              onAfterClose={() => changeValueMaoObra()}
              onRequestClose={closeModal}
              title="Cadastro de itens do pedido"
            >
              <CardListProducts products={products} />
            </ModalRender>
          </Form>
        </InfoPedido>
        <WrapperContent>
          <Button
            type="button"
            label="small"
            onClick={() => setModalIsOpen(true)}
            disabled={!clientsId.length}
          >
            Adicionar produtos
          </Button>

          <ul
            style={{
              marginTop: productsAdded.length ? '20px' : 0
            }}
          >
            {productsAdded.map(p => (
              <ListProductsAdd product={p} key={p.id} />
            ))}
          </ul>
        </WrapperContent>
      </Content>
    </Container>
  )
}
