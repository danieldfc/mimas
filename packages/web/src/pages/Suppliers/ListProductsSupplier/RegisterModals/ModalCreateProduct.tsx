import React, { useCallback, useRef, useState } from 'react'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { AiOutlineInsertRowBelow } from 'react-icons/ai'
import { FaBoxOpen } from 'react-icons/fa'
import { MdOutlineTitle, MdPriceChange } from 'react-icons/md'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import ModalRender from '../../../../components/Modal'
import SelectInput from '../../../../components/SelectInput'
import { SelectTypeProduct, WrapperFormDiv } from '../styles'
import { typeProducts } from '../util'
import { useSupplier } from '../../../../hooks/supplier'
import { Product, ProductType } from '../../../../interfaces/Product'

import { api } from '../../../../services/api'
import { useToast } from '../../../../hooks/toast'
import getValidationErrors from '../../../../utils/getValidationError'
import { FormHandles } from '@unform/core'

type Props = {
  modalIsOpen: boolean
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  closeModal: () => void
}

export type IFormProduct = {
  price: number
  title: string
  type: ProductType
  maximumAmount: number
  description: string
  supplierId: string
}

export default function ModalCreateProduct({
  modalIsOpen,
  setModalIsOpen,
  closeModal
}: Props) {
  const [typeProduct, setTypeProduct] = useState<ProductType | undefined>(
    ProductType.METERS
  )
  const { addToast } = useToast()
  const { supplierSelected, updateSupplier } = useSupplier()

  const formRef = useRef<FormHandles>(null)

  const handleSubmit = useCallback(
    async (data: IFormProduct, { reset }) => {
      try {
        if (supplierSelected) {
          formRef.current?.setErrors({})

          const dataRequest = {
            title: data.title,
            description: data.description,
            price: +data.price,
            type: typeProduct,
            maximumAmount: +data.maximumAmount,
            supplierId: supplierSelected.id
          }

          const schema = Yup.object().shape({
            title: Yup.string().required('Título do produto obrigatório'),
            description: Yup.string().required(
              'Descrição do produto obrigatório'
            ),
            price: Yup.number()
              .typeError('Informe o preço do produto')
              .min(0)
              .required('Preço do produto obrigatório'),
            type: Yup.string().required('Tipo do produto é obrigatório')
          })
          await schema.validate(dataRequest, { abortEarly: false })

          await api.post<Product>('/products', dataRequest)

          await updateSupplier(supplierSelected.id, supplierSelected)

          setModalIsOpen(false)

          reset()
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
      }
    },
    [addToast, supplierSelected, typeProduct, setModalIsOpen, updateSupplier]
  )

  return (
    <ModalRender
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      title="Cadastro de produtos do fornecedor"
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input icon={FaBoxOpen} name="title" placeholder="Título do produto" />
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
          step="0.01"
          min="0"
        />

        <WrapperFormDiv>
          <Input
            icon={AiOutlineInsertRowBelow}
            name="maximumAmount"
            placeholder={
              typeProduct === ProductType.METERS
                ? 'Quantos metros tem disponível?'
                : 'Quantas gramas tem disponível?'
            }
            type="number"
            min="0"
            step="0.01"
          />
          <SelectTypeProduct>
            <SelectInput
              placeholder="Selecione o tipo do produto"
              onChange={(event: any) => setTypeProduct(event?.value ?? null)}
              itens={typeProducts}
              title="Tipo"
              id="form-type-product"
              name="type"
              isClearable
              noOptionsMessage={() => 'Nenhum tipo cadastrado'}
              hasLabel={false}
              value={typeProducts.find(t => t.value === typeProduct)}
            />
          </SelectTypeProduct>
        </WrapperFormDiv>

        <Button type="submit" label="little" style={{ width: '100%' }}>
          Cadastrar
        </Button>
      </Form>
    </ModalRender>
  )
}
