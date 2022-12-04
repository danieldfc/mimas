import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import api from '@mimas/axios-config'

import {
  MdDateRange,
  MdDescription,
  MdOutlinePriceCheck,
  MdTitle
} from 'react-icons/md'
import { FiArrowLeft } from 'react-icons/fi'

import Button from '../../components/Button'
import { Header } from '../../components/Header'
import Input from '../../components/Input'
import { useClient } from '../../hooks/client'

import { Container, Content, HeaderWrapper } from './styles'
import { CardListProducts } from '../../components/CardListProducts'
import SelectInput from '../../components/SelectInput'
import ModalRender from '../../components/Modal'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationError'
import ListProductsAdd from '../../components/ListProductsAdded'
import { Supplier } from '../../hooks/supplier'

export type Product = {
  id: string
  title: string
  description: string
  price: string
  supplierId: string
  supplier: Supplier

  add: boolean
  qtd: number
}

type IFormDataOrder = {
  title: string
  description?: string
  deliveryAt: Date
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
  const [clientId, setClientId] = useState(clients[0]?.id ?? '')
  const [products, setProducts] = useState<Product[]>([])

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
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

        const order = {
          ...data,
          deliveryAt: new Date(`${data.deliveryAt}:00-00:00`),
          clientId,
          metadado: produtos,
          workmanship: +data.workmanship
        }

        const schema = Yup.object().shape({
          clientId: Yup.string().uuid().required('Cliente é obrigatório'),
          metadado: Yup.array().min(1).required('Produtos obrigatórios'),
          workmanship: Yup.number().min(1),
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
    [clientId, addToast, history, products]
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

      <Content>
        <h3>Total do pedido: R$ {precoTotal}</h3>
        <Form ref={formRef} onSubmit={handleSubmit} id="form-create-order">
          <div>
            <SelectInput
              itens={clients.map(p => ({ label: p.name, value: p.id }))}
              onChange={(event: any) => setClientId(event.value)}
              title="Cliente"
              id="form-client-id"
              name="clientId"
            />

            <Input icon={MdTitle} name="title" placeholder="Título" />
            <Input
              icon={MdDescription}
              name="description"
              placeholder="Descrição"
            />
            <Input
              icon={MdOutlinePriceCheck}
              name="workmanship"
              placeholder="Preço de mão de obra"
              type="number"
              onChange={changeValueMaoObra}
            />
            <Input
              icon={MdDateRange}
              name="deliveryAt"
              placeholder="Preço de mão de obra"
              type="datetime-local"
              min={new Date().toISOString().slice(0, -8)}
            />
          </div>
          <ModalRender
            isOpen={modalIsOpen}
            onAfterClose={() => changeValueMaoObra()}
            onRequestClose={closeModal}
            title="Cadastro de itens do pedido"
          >
            <CardListProducts products={products} />
          </ModalRender>
          <ul
            style={{
              marginTop: productsAdded.length ? '20px' : 0
            }}
          >
            {productsAdded.map(p => (
              <ListProductsAdd product={p} key={p.id} />
            ))}
          </ul>

          {!productsAdded.length && (
            <p style={{ marginTop: '5px' }}>Adicione produtos no pedido</p>
          )}

          <div>
            <Button
              type="button"
              label="little"
              onClick={() => setModalIsOpen(true)}
            >
              Adicionar produtos
            </Button>
            <Button type="submit" label="little">
              Criar pedido
            </Button>
          </div>
        </Form>
      </Content>
    </Container>
  )
}
