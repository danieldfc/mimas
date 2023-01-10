import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.main``

export const HeaderWrapper = styled.aside`
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

export const Content = styled.section`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
  }

  button {
    background-color: #561482;
    width: 100%;

    &:hover {
      background-color: ${shade(0.2, '#561482')};
    }
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`
