import React from 'react'
import { useSupplier } from '../../../../hooks/supplier'
import { Product } from '../../../../interfaces/Product'
import ModalCreateProduct from './ModalCreateProduct'
import ModalUpdateProduct from './ModalUpdateProduct'

type Props = {
  modalIsOpen: boolean
  modalProductIsOpen: boolean
  productSelected: Product | null
  setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setModalProductIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  closeModal: () => void
}

export default function RegisterModals({
  modalIsOpen,
  modalProductIsOpen,
  setModalIsOpen,
  productSelected,
  setModalProductIsOpen,
  closeModal
}: Props) {
  const { supplierSelected } = useSupplier()

  return (
    <>
      {productSelected && (
        <ModalUpdateProduct
          closeModal={closeModal}
          modalProductIsOpen={modalProductIsOpen}
          productSelected={productSelected}
          setModalProductIsOpen={setModalProductIsOpen}
        />
      )}

      {supplierSelected && (
        <ModalCreateProduct
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
        />
      )}
    </>
  )
}
