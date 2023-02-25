import { FormHandles } from '@unform/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi'
import TableList from '../../../components/TableList'
import { Supplier, useSupplier } from '../../../hooks/supplier'
import { useToast } from '../../../hooks/toast'
import { Product } from '../../../interfaces/Product'
import { api } from '../../../services/api'
import getValidationErrors from '../../../utils/getValidationError'
import * as Yup from 'yup'
import {
  ContentSupplier,
  Pagination,
  PaginationButton,
  PaginationItem,
  WrapperButton
} from './styles'
import RegisterModals from './RegisterModals'
import Button from '../../../components/Button'
import { typeProducts } from './util'

type Props = {
  modalIsOpen: boolean
  modalProductIsOpen: boolean
  productSelected: Product | null
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setModalProductIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setModalFornecedorIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setProductSelected: React.Dispatch<React.SetStateAction<Product | null>>
  closeModal: () => void
}

export function ListProductsSupplier({
  modalIsOpen,
  modalProductIsOpen,
  productSelected,
  setModalIsOpen,
  setModalProductIsOpen,
  setModalFornecedorIsOpen,
  setProductSelected,
  closeModal
}: Props) {
  const [limit] = useState(10)
  const [pages, setPages] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState(1)

  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const { supplierSelected, updateSupplier } = useSupplier()

  const handleDeleteProduct = useCallback(
    async (id: string) => {
      try {
        if (!supplierSelected) return
        await api.delete(`/products/${id}/suppliers/${supplierSelected.id}`)

        await updateSupplier(supplierSelected.id, {
          ...supplierSelected,
          products: supplierSelected.products.filter(p => p.id !== id)
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
    },
    [addToast, updateSupplier, supplierSelected]
  )

  useEffect(() => {
    async function getProductsSupplier() {
      if (!supplierSelected) return

      const result = await api.get<{ supplier: Supplier }>(
        `/suppliers/${supplierSelected.id}`
      )

      const { products = [] } = result.data.supplier

      const totalPages = Math.ceil(products.length / limit)
      const arrayPages = []
      for (let i = 1; i <= totalPages; i++) {
        arrayPages.push(i)
      }
      setPages(arrayPages)
    }
    getProductsSupplier()
  }, [limit, supplierSelected])

  return (
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

      <TableList>
        <>
          <thead>
            <tr>
              <th> PRODUTO </th>
              <th className="center"> DESCRIÇÃO </th>
              <th className="center"> PREÇO </th>
              <th className="center"> QTD </th>
              <th className="center"> TIPO </th>
              <th className="center"> AÇÕES </th>
            </tr>
          </thead>
          <tbody>
            {(supplierSelected?.products ?? []).map((product: Product) => (
              <tr key={product.id}>
                <td> {product.title}</td>
                <td className="center">{product.description ?? 'N/A'}</td>
                <td className="center">{product.price}</td>
                <td className="center">{product.maximumAmount}</td>
                <td className="center">
                  {typeProducts.find(t => t.value === product.type)?.label}
                </td>
                <td className="actions">
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    type="button"
                    className="finish"
                  >
                    Remover
                  </button>
                  <button
                    type="button"
                    className="cancel"
                    onClick={() => {
                      setModalIsOpen(false)
                      setProductSelected(product)
                      setModalProductIsOpen(true)
                    }}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </>
      </TableList>
      <Pagination>
        <PaginationButton>
          {currentPage > 1 && (
            <PaginationItem
              isSelector
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              <BiSkipPrevious size={24} />
            </PaginationItem>
          )}
          {pages.map(page => (
            <PaginationItem
              isSelect={page === currentPage}
              key={page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationItem>
          ))}
          {currentPage < pages.length && (
            <PaginationItem
              isSelector
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              <BiSkipNext size={24} />
            </PaginationItem>
          )}
        </PaginationButton>
      </Pagination>

      <RegisterModals
        modalIsOpen={modalIsOpen}
        modalProductIsOpen={modalProductIsOpen}
        productSelected={productSelected}
        setModalIsOpen={setModalIsOpen}
        setModalProductIsOpen={setModalProductIsOpen}
        closeModal={closeModal}
      />
    </ContentSupplier>
  )
}
