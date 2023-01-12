import styled from 'styled-components'
import Modal from 'react-modal'
import { lighten } from 'polished'

export const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;

  h2 {
    color: black;
  }

  @media (max-width: 1280px) {
    h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 0.9rem;
    }
  }
`

export const ModalContent = styled.div`
  width: 50%;
  height: auto;
  background-color: #fff;
  border-radius: 8px;
  padding: 0.8rem 1.4rem;

  @media (min-width: 1280px) {
    width: 60%;

    h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    width: 75%;
  }

  @media (max-width: 768px) {
    width: 75%;

    form {
      > button {
        width: 100%;
      }
    }

    > div:last-child {
      display: flex;
      margin: 0;

      button {
        width: 100%;
        margin: 0;
      }

      button + button {
        margin-left: 20px;
      }
    }
  }

  @media (max-width: 425px) {
    width: 80%;

    form svg {
      display: none;
    }
  }
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
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  align-content: flex-end;
  flex-flow: column wrap;

  > button:first-child {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;

    background-color: ${lighten(0.2, '#7f3e98')};
    color: #fff;
    transition: background-color 0.2s;

    :hover {
      background-color: #7f3e98;
    }
  }
`

export const ModalClosed = styled.button`
  background: ${lighten(0.15, '#7f3e98')};
  border: none;
  padding: 0.15rem 0.5rem;
  height: 50%;
  border-radius: 50%;
  color: #fff;
  transition: background-color 0.2s;

  :hover {
    background: ${lighten(0.05, '#7f3e98')};
  }
`
