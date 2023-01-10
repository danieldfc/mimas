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
    width: 280px;

    > :last-child {
      color: #cfbaf0;
      text-decoration: underline;
    }
  }
`

export const SelectSupplier = styled.ul`
  display: flex;
  flex-direction: column;

  width: 15%;
  height: 50vh;

  background-color: white;
  color: #000;
  padding: 0.7rem;

  border-radius: 0.4rem;

  li + li {
    margin-top: 0.3rem;
  }

  overflow: auto;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 90%;
    margin: 0 auto;
    height: 3rem;

    align-items: center;
    justify-content: start;

    overflow-x: auto;
    flex-wrap: nowrap;
    max-width: 90%;

    margin-bottom: 1rem;

    li {
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        margin-right: 0.3rem;
      }

      label {
        margin-right: 1rem;
      }
    }

    li + li {
      margin-left: 1rem;
      margin-top: 0;
    }
  }
`

export const ContentSupplier = styled.div`
  width: 70%;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
`

export const WrapperButton = styled.div`
  margin-right: 1.3rem;
  margin-bottom: 0.5rem;

  display: flex;
  justify-content: right;

  button {
    background-color: orange;
    transition: all 0.4s;
    width: 30%;
    margin-top: 0;

    :hover {
      background-color: ${shade(0.1, 'orange')};
    }
  }

  button + button {
    margin-left: 1.5rem;
  }

  @media (max-width: 1450px) {
    button {
      font-size: 0.7rem;
      line-height: 1.1rem;
      width: 40%;
    }
  }

  @media (max-width: 450px) {
    margin-right: 0;

    button {
      font-size: 0.6rem;
      line-height: 1rem;
      width: 100%;
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

export const AsideSupplier = styled.aside`
  display: flex;
  margin: 0 auto;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
