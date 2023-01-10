import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div``

export const HeaderWrapper = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    color: #cfbaf0;
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  button {
    background-color: #561482;

    &:hover {
      background-color: ${shade(0.2, '#561482')};
    }
  }

  form > button:last-child {
    width: 100%;
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;

    form svg {
      display: none;
    }
  }
`
