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
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    color: #cfbaf0;
  }

  div {
    display: flex;
    justify-content: space-between;

    margin-top: 2rem;

    > :last-child {
      color: #cfbaf0;
      text-decoration: underline;
    }
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;
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

  @media (max-width: 1280px) {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    width: 90%;
    margin: 0 auto;
    height: 3rem;

    font-size: 0.8rem;

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
  width: 50%;

  display: flex;
  flex-direction: column;

  > :last-child {
    margin-left: 1rem;
  }

  @media (min-width: 1280px) {
    width: 70%;
  }

  @media (max-width: 1280px) {
    width: 75%;
  }

  @media (max-width: 768px) {
    width: 90%;
    margin: 0 auto;

    > :last-child {
      margin-left: 0;
    }
  }
`

export const WrapperButton = styled.div`
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

  @media (max-width: 768px) {
    button {
      width: 100%;
    }
  }

  @media (max-width: 450px) {
    margin-right: 0;

    button {
      font-size: 0.6rem;
      line-height: 1rem;
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
