import api from '@mimas/axios-config'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef, useState } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { MdOutlineTitle, MdPriceChange } from 'react-icons/md'
import { FaBoxOpen } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../components/Button'
import { Header } from '../../components/Header'
import Input from '../../components/Input'
import ModalRender from '../../components/Modal'
import TableList from '../../components/TableList'
import { Product } from '../CreateOrder'

import {
  Container,
  ContainerWithoutSupplier,
  Content,
  SelectSupplier,
  Wrapper,
  WrapperButton
} from './styles'
import { useToast } from '../../hooks/toast'
import getValidationErrors from '../../utils/getValidationError'
import { Supplier, useSupplier } from '../../hooks/supplier'

type IFormProduct = {
  price: number
  title: string
  description: string
  supplierId: string
}

export function Suppliers() {
  const { suppliers } = useSupplier()
  const [loading, setLoading] = useState(false)
  const [supplierSelected, setSupplierSelected] = useState<Supplier | null>(
    null
  )

  const { addToast } = useToast()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const formRef = useRef<FormHandles>(null)

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
  }, [])

  const handleSubmit = useCallback(
    async (data: IFormProduct) => {
      try {
        if (supplierSelected) {
          setLoading(true)
          formRef.current?.setErrors({})

          const schema = Yup.object().shape({
            title: Yup.string().required('Título do produto obrigatório'),
            description: Yup.string().required(
              'Descrição do produto obrigatório'
            ),
            price: Yup.number().min(0).required('Preço do produto obrigatório')
          })
          await schema.validate(data, { abortEarly: false })

          const response = await api.post<Product>('/products', {
            title: data.title,
            description: data.description,
            price: data.price,
            supplierId: supplierSelected.id
          })

          setSupplierSelected({
            ...supplierSelected,
            products: [...supplierSelected.products, { ...response.data }]
          })
        }
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na criação do produto',
          description: 'Ocorreu um erro na criação do produto.'
        })
      } finally {
        setLoading(false)
      }
    },
    [addToast, supplierSelected]
  )

  const handleDeleteProduct = useCallback(
    async (id: string, supplier: Supplier) => {
      setLoading(true)
      try {
        await api.delete(`/products/${id}/suppliers/${supplier.id}`)

        setSupplierSelected({
          ...supplier,
          products: supplier.products.filter(p => p.id !== id)
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro ao deletar produto',
          description: 'Ocorreu um erro ao deletar um produto.'
        })
      }
      setLoading(false)
    },
    [addToast]
  )

  return (
    <Container>
      <Header />
      <Wrapper>
        <h3>Meus fornecedores</h3>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
            Voltar
          </Link>
          <Link to="/create-supplier">Cadastrar fornecedor</Link>
        </div>
      </Wrapper>

      {!suppliers.length && (
        <ContainerWithoutSupplier>
          Você não possui fornecedores cadastrados
        </ContainerWithoutSupplier>
      )}

      {!!suppliers.length && (
        <>
          <SelectSupplier>
            {suppliers.map(supplier => (
              <li key={supplier.id}>
                <label>
                  <input
                    type="radio"
                    name={supplier.name}
                    value={supplier.id}
                    checked={
                      supplierSelected
                        ? supplierSelected.id === supplier.id
                        : false
                    }
                    onChange={() => setSupplierSelected(supplier)}
                  />{' '}
                  {supplier.name}
                </label>
              </li>
            ))}
          </SelectSupplier>

          <Content>
            <WrapperButton>
              <Button
                disabled={!supplierSelected?.id}
                onClick={() => setModalIsOpen(true)}
                label="small"
              >
                Cadastrar novos produtos
              </Button>
            </WrapperButton>
            <TableList loading={loading}>
              <>
                <thead>
                  <tr>
                    <th> PRODUTO </th>
                    <th className="center"> DESCRIÇÃO </th>
                    <th className="center"> PREÇO </th>
                    <th className="center"> AÇÕES </th>
                  </tr>
                </thead>
                <tbody>
                  {(supplierSelected?.products ?? []).map(
                    (product: Product) => (
                      <tr key={product.id}>
                        <td> {product.title}</td>
                        <td className="center">
                          {product.description ?? 'N/A'}
                        </td>
                        <td className="center">{product.price}</td>
                        <td className="actions">
                          <button
                            onClick={() =>
                              handleDeleteProduct(
                                product.id,
                                supplierSelected as Supplier
                              )
                            }
                            type="button"
                            className="finish"
                          >
                            Remover
                          </button>
                          <button type="button" className="cancel">
                            Editar
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </>
            </TableList>
          </Content>

          <ModalRender
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            title="Cadastro de produtos do fornecedor"
          >
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                icon={FaBoxOpen}
                name="title"
                placeholder="Título do produto"
              />
              <Input
                icon={MdOutlineTitle}
                name="description"
                placeholder="Descrição do produto"
              />
              <Input
                icon={MdPriceChange}
                name="price"
                placeholder="Preço do produto"
                type="number"
                min="0"
              />
              <Button type="submit" label="small">
                Criar produto
              </Button>
            </Form>

            <TableList>
              <>
                <thead>
                  <tr>
                    <th> PRODUTO </th>
                    <th className="center"> DESCRIÇÃO </th>
                    <th className="center"> PREÇO </th>
                    <th className="center"> AÇÕES </th>
                  </tr>
                </thead>
                <tbody>
                  {(supplierSelected?.products ?? []).map(
                    (product: Product) => (
                      <tr key={product.id}>
                        <td> {product.title}</td>
                        <td className="center">
                          {product.description ?? 'N/A'}
                        </td>
                        <td className="center">{product.price}</td>
                        <td className="actions">
                          <button
                            type="button"
                            className="finish"
                            onClick={() =>
                              handleDeleteProduct(
                                product.id,
                                supplierSelected as Supplier
                              )
                            }
                          >
                            Remover
                          </button>
                          <button
                            type="button"
                            className="cancel"
                            onClick={() => {
                              console.log('Deu certo cancel')
                            }}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </>
            </TableList>
          </ModalRender>
        </>
      )}
    </Container>
  )
}
