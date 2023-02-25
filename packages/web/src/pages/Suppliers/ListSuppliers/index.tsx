import React from 'react'

import { Container, SelectSupplier } from './styles'
import { useSupplier } from '../../../hooks/supplier'
import formatBigString from '../../../utils/formatBigString'
import { ModalUpdateSupplier } from './Modals/ModalUpdateSupplier'

type Props = {
  modalFornecedorIsOpen: boolean
  closeModal: () => void
}

export function ListSuppliers({ closeModal, modalFornecedorIsOpen }: Props) {
  const { suppliers, supplierSelected, selectSupplierId } = useSupplier()

  return (
    <Container>
      {!!suppliers.length && (
        <SelectSupplier>
          {suppliers.map((supplier, index) => (
            <li key={supplier.id}>
              <input
                id={`supplier-${index}`}
                type="radio"
                name={supplier.name}
                value={supplier.id}
                readOnly
                checked={supplierSelected?.id === supplier.id}
                onClick={() =>
                  selectSupplierId(supplierSelected ? undefined : supplier.id)
                }
              />
              <label htmlFor={`supplier-${index}`}>
                &nbsp;{formatBigString(supplier.name, 25)}
              </label>
            </li>
          ))}
        </SelectSupplier>
      )}

      {supplierSelected && (
        <ModalUpdateSupplier
          modalFornecedorIsOpen={modalFornecedorIsOpen}
          closeModal={closeModal}
        />
      )}
    </Container>
  )
}
