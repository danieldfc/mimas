import { api } from '../../../services/api'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef, useState } from 'react'
import { FiArrowLeft, FiMail, FiPhone } from 'react-icons/fi'
import { MdOutlineTitle, MdPriceChange } from 'react-icons/md'
import { FaBoxOpen, FaRegAddressCard } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import Button from '../../../components/Button'
import { Header } from '../../../components/Header'
import Input from '../../../components/Input'
import ModalRender from '../../../components/Modal'
import TableList from '../../../components/TableList'

import {
  AsideSupplier,
  Container,
  ContainerWithoutSupplier,
  Content,
  ContentSupplier,
  SelectSupplier,
  Wrapper,
  WrapperButton,
  WrapperFormButton
} from './styles'
import { useToast } from '../../../hooks/toast'
import getValidationErrors from '../../../utils/getValidationError'
import { Supplier, useSupplier } from '../../../hooks/supplier'
import { Product } from '../../../interfaces/Product'
import { GoPerson } from 'react-icons/go'
import removeEmptyFields from '../../../utils/removeEmptyFields'
import formatBigString from '../../../utils/formatBigString'

type IFormProduct = {
  price: number
  title: string
  description: string
  supplierId: string
}

type IFormSupplier = {
  name: string
  email: string
  phone: string
  address: string
}

export function ListSuppliers() {
  const { suppliers, updateSupplier, deleteSupplier } = useSupplier()
  const [loading, setLoading] = useState(false)
  const [supplierSelected, setSupplierSelected] = useState<Supplier | null>(
    null
  )

  const { addToast } = useToast()
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [modalFornecedorIsOpen, setModalFornecedorIsOpen] = useState(false)
  const [modalProductIsOpen, setModalProductIsOpen] = useState(false)
  const [productSelected, setProductSelected] = useState<Product | null>(null)
  const formRef = useRef<FormHandles>(null)

  const closeModal = useCallback(() => {
    setModalIsOpen(false)
    setModalProductIsOpen(false)
    setModalFornecedorIsOpen(false)
  }, [])

  const handleSubmitUpdate = useCallback(
    async (data: IFormProduct) => {
      try {
        if (supplierSelected && productSelected) {
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

          await api.put<Product>(`/products/${productSelected.id}`, {
            supplierId: supplierSelected.id,
            title: data.title,
            description: data.description,
            price: data.price
          })

          const productIndex = supplierSelected.products.findIndex(
            p => p.id === productSelected.id
          )

          if (productIndex >= 0) {
            Object.assign(supplierSelected.products[productIndex], {
              title: data.title,
              description: data.description,
              price: data.price
            })
            setSupplierSelected({
              ...supplierSelected,
              products: [...supplierSelected.products]
            })
          }
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
    [addToast, supplierSelected, productSelected]
  )

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

  const handleSubmitUpdateSupplier = useCallback(
    async (data: IFormSupplier) => {
      const fields = removeEmptyFields<IFormSupplier>(data)
      if (!supplierSelected) return

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

        await updateSupplier(supplierSelected.id, {
          email: fields.email ?? '',
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          address: fields.address ?? ''
        })

        setSupplierSelected({
          ...supplierSelected,
          email: fields.email ?? '',
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          address: fields.address ?? ''
        })

        addToast({
          type: 'success',
          title: 'Fornecedor atualizado',
          description:
            'Informações do fornecedor foram atualizadas com sucesso.'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        addToast({
          type: 'error',
          title: 'Erro na atualização do fornecedor',
          description: 'Ocorreu um erro ao atualizar um fornecedor.'
        })
      }
    },
    [addToast, supplierSelected, updateSupplier]
  )

  const handleDeleteSupplier = useCallback(async () => {
    if (!supplierSelected) return

    setLoading(true)
    try {
      deleteSupplier(supplierSelected.id)

      setSupplierSelected(null)

      addToast({
        type: 'success',
        title: 'Fornecedor deletado',
        description: 'Fornecedor deletado com sucesso.'
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)

        return
      }

      addToast({
        type: 'error',
        title: 'Erro ao deletar fornecedor',
        description: 'Ocorreu um erro ao deletar o fornecedor.'
      })
    }
    setLoading(false)
  }, [addToast, supplierSelected, deleteSupplier])

  return (
    <Container>
      <Header />
      <Wrapper>
        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
        <div>
          <h3>Meus fornecedores</h3>
          <Link to="/create-supplier">Cadastrar novo fornecedor</Link>
        </div>
      </Wrapper>

      <Content>
        {!suppliers.length && (
          <ContainerWithoutSupplier>
            Você não possui fornecedores cadastrados
          </ContainerWithoutSupplier>
        )}

        {!!suppliers.length && (
          <>
            <AsideSupplier>
              <SelectSupplier>
                {suppliers.map((supplier, index) => (
                  <li key={supplier.id}>
                    <input
                      id={`supplier-${index}`}
                      type="radio"
                      name={supplier.name}
                      value={supplier.id}
                      checked={
                        supplierSelected
                          ? supplierSelected.id === supplier.id
                          : false
                      }
                      onChange={() => setSupplierSelected(supplier)}
                    />
                    <label htmlFor={`supplier-${index}`}>
                      &nbsp;{formatBigString(supplier.name, 25)}
                    </label>
                  </li>
                ))}
              </SelectSupplier>

              <ContentSupplier>
                <WrapperButton>
                  <Button
                    disabled={!supplierSelected?.id}
                    onClick={() => {
                      setModalIsOpen(false)
                      setModalProductIsOpen(false)
                      setModalFornecedorIsOpen(true)
                    }}
                    label="small"
                  >
                    Atualizar fornecedor
                  </Button>
                  <Button
                    disabled={!supplierSelected?.id}
                    onClick={() => {
                      setModalIsOpen(true)
                      setModalProductIsOpen(false)
                      setModalFornecedorIsOpen(false)
                    }}
                    label="small"
                  >
                    Cadastrar novos produtos
                  </Button>
                </WrapperButton>
                <TableList
                  total={(supplierSelected?.products ?? []).length}
                  loading={loading}
                >
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
                              <button
                                type="button"
                                className="cancel"
                                onClick={() => {
                                  setProductSelected(product)
                                  setModalProductIsOpen(true)
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
              </ContentSupplier>
            </AsideSupplier>

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
                <Button type="submit" label="little">
                  Cadastrar
                </Button>
              </Form>

              <TableList total={(supplierSelected?.products ?? []).length}>
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
                              setProductSelected(product)
                              setModalIsOpen(false)
                              setModalProductIsOpen(true)
                            }}
                          >
                            Editar
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </TableList>
            </ModalRender>

            {productSelected && (
              <ModalRender
                isOpen={modalProductIsOpen}
                onRequestClose={closeModal}
                title="Editar produto"
              >
                <Form ref={formRef} onSubmit={handleSubmitUpdate}>
                  <Input
                    icon={FaBoxOpen}
                    name="title"
                    placeholder="Título do produto"
                    defaultValue={productSelected.title}
                  />
                  <Input
                    icon={MdOutlineTitle}
                    name="description"
                    placeholder="Descrição do produto"
                    defaultValue={productSelected.description}
                  />
                  <Input
                    icon={MdPriceChange}
                    name="price"
                    placeholder="Preço do produto"
                    type="number"
                    min="0"
                    step="0.01"
                    defaultValue={parseFloat(
                      productSelected.price.replace('$', '')
                    )}
                  />
                  <Button type="submit" label="little">
                    Atualizar produto
                  </Button>
                </Form>
              </ModalRender>
            )}
          </>
        )}

        {supplierSelected && (
          <ModalRender
            isOpen={modalFornecedorIsOpen}
            onRequestClose={closeModal}
            title="Atualizar informações do fornecedor"
          >
            <Form ref={formRef} onSubmit={handleSubmitUpdateSupplier}>
              <Input
                icon={GoPerson}
                name="name"
                placeholder="Nome"
                defaultValue={supplierSelected.name}
              />
              <Input
                icon={FiMail}
                type="email"
                name="email"
                placeholder="E-mail"
                defaultValue={supplierSelected.email}
              />
              <Input
                icon={FiPhone}
                type="tel"
                name="phone"
                placeholder="Telefone"
                defaultValue={supplierSelected.phone}
              />
              <Input
                icon={FaRegAddressCard}
                name="address"
                placeholder="Endereço"
                defaultValue={supplierSelected.address}
              />
              <WrapperFormButton>
                <Button type="submit" label="little">
                  Atualizar
                </Button>
                <Button
                  type="button"
                  label="little"
                  onClick={handleDeleteSupplier}
                >
                  Deletar
                </Button>
              </WrapperFormButton>
            </Form>
          </ModalRender>
        )}
      </Content>
    </Container>
  )
}
