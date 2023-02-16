import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.section``

export const HeaderWrapper = styled.aside`
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

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  > div:first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > button:first-child {
    width: 13rem;
    height: 2rem;
    margin: 0 0 1rem 0;

    background-color: var(--btn-color-delete);

    :hover {
      background-color: ${shade(0.2, '#e0144c')};
    }
  }
`

export const WrapperButton = styled.section`
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
