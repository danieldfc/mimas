import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import React, { useCallback, useRef, useState } from 'react'
import { FaRegAddressCard } from 'react-icons/fa'
import { FiMail, FiPhone } from 'react-icons/fi'
import { GoPerson } from 'react-icons/go'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import ModalRender from '../../../../components/Modal'
import { TypePix, useSupplier } from '../../../../hooks/supplier'
import { useToast } from '../../../../hooks/toast'
import getValidationErrors from '../../../../utils/getValidationError'
import removeEmptyFields from '../../../../utils/removeEmptyFields'
import { WrapperFormButton, WrapperPix } from '../styles'

import * as Yup from 'yup'
import SelectInput from '../../../../components/SelectInput'
import { MdVpnKey } from 'react-icons/md'
import { typesPix } from '../../CreateSupplier/util'

type IFormSupplier = {
  name: string
  email: string
  phone: string
  address: string
  phoneSecondary: string | null
  typePix: TypePix | null
  keyPix: string | null
}

type Props = {
  modalFornecedorIsOpen: boolean
  closeModal: () => void
}

export function ModalUpdateSupplier({
  modalFornecedorIsOpen,
  closeModal
}: Props) {
  const { supplierSelected, updateSupplier, deleteSupplier, selectSupplierId } =
    useSupplier()
  const [selectTypePix, setSelectTypePix] = useState<TypePix | null>(
    supplierSelected?.typePix ?? null
  )
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)

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
          address: Yup.string().nullable(),
          phoneSecondary: Yup.string().nullable(),
          typePix: Yup.mixed<TypePix>()
            .oneOf(Object.values(TypePix))
            .nullable(),
          keyPix: Yup.string().nullable()
        })
        await schema.validate(fields, { abortEarly: false })

        await updateSupplier(supplierSelected.id, {
          email: fields.email ?? '',
          name: fields.name ?? '',
          phone: fields.phone ?? '',
          address: fields.address ?? '',
          keyPix: fields.keyPix ?? null,
          phoneSecondary: fields.phoneSecondary ?? null,
          typePix: selectTypePix
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
    [addToast, supplierSelected, updateSupplier, selectTypePix]
  )

  const handleDeleteSupplier = useCallback(async () => {
    if (!supplierSelected) return

    try {
      await deleteSupplier(supplierSelected.id)

      selectSupplierId(undefined)

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
  }, [addToast, supplierSelected, deleteSupplier, selectSupplierId])

  return (
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
          defaultValue={supplierSelected?.name}
        />
        <Input
          icon={FiMail}
          type="email"
          name="email"
          placeholder="E-mail"
          defaultValue={supplierSelected?.email}
        />
        <Input
          icon={FiPhone}
          type="tel"
          name="phone"
          placeholder="Telefone"
          defaultValue={supplierSelected?.phone}
        />
        <Input
          icon={FiPhone}
          type="tel"
          name="phoneSecondary"
          placeholder="Telefone secundário (opcional)"
          defaultValue={supplierSelected?.phoneSecondary ?? ''}
        />
        <Input
          icon={FaRegAddressCard}
          name="address"
          placeholder="Endereço"
          defaultValue={supplierSelected?.address}
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
            defaultValue={supplierSelected?.keyPix ?? ''}
          />
        </WrapperPix>
        <WrapperFormButton>
          <Button type="submit" label="little">
            Atualizar
          </Button>
          <Button type="button" label="little" onClick={handleDeleteSupplier}>
            Deletar
          </Button>
        </WrapperFormButton>
      </Form>
    </ModalRender>
  )
}
