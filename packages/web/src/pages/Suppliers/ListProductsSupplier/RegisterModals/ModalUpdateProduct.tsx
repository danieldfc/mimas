import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef, useState } from 'react'
import { FaBoxOpen } from 'react-icons/fa'
import { MdOutlineTitle, MdPriceChange } from 'react-icons/md'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import ModalRender from '../../../../components/Modal'
import { useSupplier } from '../../../../hooks/supplier'
import { Product, ProductType } from '../../../../interfaces/Product'
import { api } from '../../../../services/api'
import getValidationErrors from '../../../../utils/getValidationError'
import { IFormProduct } from './ModalCreateProduct'
import * as Yup from 'yup'
import { useToast } from '../../../../hooks/toast'
import { AiOutlineInsertRowBelow } from 'react-icons/ai'
import SelectInput from '../../../../components/SelectInput'
import { SelectTypeProduct, WrapperFormDiv } from '../styles'
import { typeProducts } from '../util'

type Props = {
  productSelected: Product
  modalProductIsOpen: boolean
  setModalProductIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  closeModal: () => void
}

export default function ModalUpdateProduct({
  productSelected,
  modalProductIsOpen,
  setModalProductIsOpen,
  closeModal
}: Props) {
  const [typeProduct, setTypeProduct] = useState<string | undefined>(
    productSelected?.type
  )
  const { supplierSelected, updateSupplier } = useSupplier()
  const { addToast } = useToast()

  const formRef = useRef<FormHandles>(null)

  const handleSubmitUpdate = useCallback(
    async (data: IFormProduct) => {
      try {
        if (supplierSelected && productSelected) {
          formRef.current?.setErrors({})

          const dataResponse = {
            supplierId: supplierSelected.id,
            title: data.title,
            description: data.description,
            price: +data.price,
            type: typeProduct,
            maximumAmount: +data.maximumAmount
          }

          const schema = Yup.object().shape({
            title: Yup.string().required('Título do produto obrigatório'),
            description: Yup.string().required(
              'Descrição do produto obrigatório'
            ),
            price: Yup.number().min(0).required('Preço do produto obrigatório'),
            type: Yup.string().required('Tipo do produto obrigatório'),
            maximumAmount: Yup.number()
              .min(0)
              .required('Quantidade máxima do produto obrigatório')
          })
          await schema.validate(dataResponse, { abortEarly: false })

          await api.put<Product>(
            `/products/${productSelected.id}`,
            dataResponse
          )

          const productIndex = supplierSelected.products.findIndex(
            p => p.id === productSelected.id
          )

          if (productIndex >= 0) {
            Object.assign(supplierSelected.products[productIndex], {
              title: data.title,
              description: data.description,
              price: data.price
            })
            await updateSupplier(supplierSelected.id, {
              ...supplierSelected,
              products: [...supplierSelected.products]
            })
          }
        }

        setModalProductIsOpen(false)
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
    [
      addToast,
      supplierSelected,
      productSelected,
      updateSupplier,
      typeProduct,
      setModalProductIsOpen
    ]
  )

  return (
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
          defaultValue={parseFloat(productSelected.price.replace('$', ''))}
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
            step="0.01"
            min="0"
            defaultValue={productSelected.maximumAmount}
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
        <Button type="submit" label="little">
          Atualizar produto
        </Button>
      </Form>
    </ModalRender>
  )
}
