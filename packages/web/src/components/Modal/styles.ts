import styled from 'styled-components'
import Modal from 'react-modal'

export const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  h2 {
    color: black;
  }
`

export const ModalContent = styled.div`
  width: 50%;
  height: 85%;
  background-color: #fff;
  border-radius: 8px;
  padding: 0.8rem 1.4rem;
`

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
`

export const ModalMain = styled.main`
  height: 85%;
  flex: 1;
  overflow-x: auto;
  margin-top: 1rem;
`

export const ModalFooter = styled.footer`
  border-top: 1px solid #000;
  padding: 1rem;
  display: flex;
  align-content: flex-end;
  flex-flow: column wrap;
`

export const ModalClosed = styled.button`
  background: none;
  padding: 0.1rem 0.5rem;
  border-width: 0.03rem;
  border-radius: 50%;
`
