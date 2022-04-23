import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div``

export const HeaderWrapper = styled.div`
  max-width: 1240px;
  margin: 64px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    color: #cfbaf0;
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 64px auto;

  button {
    background-color: #561482;

    &:hover {
      background-color: ${shade(0.2, '#561482')};
    }
  }
`
