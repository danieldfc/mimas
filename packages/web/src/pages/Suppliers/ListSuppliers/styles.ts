import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  > .ReactModalPortal {
    table tbody td.actions {
      @media (max-width: 102.4) {
        background: red;
      }
    }
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
`

export const Wrapper = styled.div`
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

  div {
    display: flex;
    justify-content: space-between;
    width: 15rem;

    > :last-child {
      color: #cfbaf0;
      text-decoration: underline;
    }
  }
`

export const SelectSupplier = styled.ul`
  max-width: 1240px;
  margin: 0 auto;

  display: flex;
  background-color: white;
  color: #000;
  padding: 0.7rem;

  border-radius: 0.4rem;

  li {
    display: flex;
    flex-direction: column;
  }

  li + li {
    margin-left: 20px;
  }
`

export const WrapperButton = styled.div`
  max-width: 1240px;
  margin-right: 1.3rem;
  margin-bottom: 1rem;

  display: flex;
  justify-content: right;

  button {
    background-color: orange;
    transition: all 0.4s;

    :hover {
      background-color: ${shade(0.1, 'orange')};
    }
  }
`

export const ContainerWithoutSupplier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  max-width: 1240px;
  height: 3rem;
  margin: 0 auto;

  background-color: white;
  color: black;
  padding: 3rem;

  border-radius: 1rem;
`
