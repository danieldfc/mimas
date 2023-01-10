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

  button {
    display: flex;
    align-items: center;
    color: #cfbaf0;

    background: none;
    border: none;
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 64px auto;

  ul {
    display: flex;
    align-items: center;
    flex-direction: row;

    > li {
      margin-right: 20px;
    }
  }
`

export const LinkWhatsapp = styled.a`
  background-color: #25d366bb;
  color: #fff;
  padding: 0.5rem;
  margin-top: 1rem;
  display: flex;

  width: 13rem;
  height: 3rem;

  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  border-radius: 5px;

  :hover {
    background-color: ${shade(0.2, '#25d366bb')};
  }
`
