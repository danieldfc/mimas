import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.main``

export const Content = styled.section`
  max-width: 1240px;
  margin: 64px auto;

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
`
