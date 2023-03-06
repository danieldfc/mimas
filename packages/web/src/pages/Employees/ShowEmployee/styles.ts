import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  > button:first-child {
    width: 17rem;
    height: 2.5rem;
    margin: 0 0 1rem 0;

    background-color: var(--btn-color-delete);

    :hover {
      background-color: ${shade(0.2, '#e0144c')};
    }
  }
`

export const HeaderWrapper = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    display: flex;
    align-items: center;
    color: var(--lighten-color);

    background: none;
    border: none;
  }
`

export const WrapperButton = styled.div`
  display: flex;

  button {
    width: 13rem;
    height: 3rem;
    background-color: var(--secondary-color);

    :hover {
      background-color: ${shade(0.2, '#5e00a3')};
    }
  }

  button + a {
    margin-left: 1rem;
  }
`

export const LinkWhatsapp = styled.a`
  background-color: var(--success-color);
  color: var(--white-color);
  padding: 0.5rem;
  margin-top: 1rem;
  display: flex;

  width: 13rem;
  height: 3rem;

  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  border-radius: 5px;

  text-align: center;

  :hover {
    background-color: ${shade(0.2, '#008200')};
  }
`

export const WrapperPix = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;

  > div:first-child {
    width: 40%;
  }

  > div:last-child {
    width: 100%;
  }

  @media (max-width: 768px) {
    > div:first-child {
      width: 45%;
    }

    > div:last-child {
      width: 55%;
    }
  }

  @media (max-width: 425px) {
    flex-direction: column;
    gap: 0;

    > div:first-child {
      width: 100%;
      padding-bottom: 0;
    }
    > div:last-child {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
`
