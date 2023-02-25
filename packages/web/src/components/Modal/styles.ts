import styled from 'styled-components'
import Modal from 'react-modal'
import { shade } from 'polished'

export const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;

  h2 {
    color: var(--black-color);
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
  background-color: var(--white-color);
  border-radius: 8px;
  padding: 0.8rem 1.4rem;

  form {
    > button {
      width: 100%;
    }
  }

  @media (min-width: 1280px) {
    width: 60%;

    h2 {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 768px) {
    width: 75%;

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
  border-top: 1px solid var(--dark-color);
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  align-content: flex-end;
  flex-flow: column wrap;

  > button:first-child {
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;

    background-color: var(--secondary-color);
    color: var(--white-color);
    transition: background-color 0.2s;

    :hover {
      background-color: ${shade(0.2, '#5e00a3')};
    }
  }
`

export const ModalClosed = styled.button`
  background: var(--secondary-color);
  border: none;
  padding: 0.15rem 0.5rem;
  height: 50%;
  border-radius: 50%;
  color: var(--white-color);
  transition: background-color 0.2s;

  :hover {
    background: ${shade(0.2, '#5e00a3')};
  }
`
