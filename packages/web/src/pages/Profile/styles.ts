import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div``

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 30px;
  }

  button {
    background-color: var(--secondary-color);

    &:hover {
      background-color: ${shade(0.2, '#5e00a3')};
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

  a {
    display: flex;
    align-items: center;
    color: var(--lighten-color);
  }
`
