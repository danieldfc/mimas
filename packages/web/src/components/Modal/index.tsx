import React from 'react'
import Modal, { Props } from 'react-modal'
import {
  ModalClosed,
  ModalContainer,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalMain
} from './styles'

type ModalProps = Props & {
  title: string
}

Modal.setAppElement('#root')

export default function ModalRender({
  children,
  title,
  isOpen,
  onRequestClose,
  ...rest
}: ModalProps) {
  return (
    <ModalContainer isOpen={isOpen} {...rest}>
      <ModalContent>
        <ModalHeader>
          <h2>{title}</h2>
          <ModalClosed
            aria-label="Fechar"
            name="Fechar"
            onClick={onRequestClose}
          >
            X
          </ModalClosed>
        </ModalHeader>
        <ModalMain>{children}</ModalMain>
        <ModalFooter>
          <button type="button" onClick={onRequestClose}>
            Fechar
          </button>
        </ModalFooter>
      </ModalContent>
    </ModalContainer>
  )
}
