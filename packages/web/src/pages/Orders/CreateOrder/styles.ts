import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.main`
  > h3 {
    max-width: 1240px;
    margin: -1.5rem auto;
    padding: 0 2.5rem;
  }
`

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
`

export const SelectorClient = styled.div`
  display: flex;

  > :first-child {
    width: 100%;
  }
`

export const Content = styled.section`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const InfoPedido = styled.aside`
  width: 70%;

  button {
    background-color: #561482;

    &:hover {
      background-color: ${shade(0.2, '#561482')};
    }
  }

  label {
    margin-right: 5px;
  }

  select {
    margin-bottom: 16px;
    padding: 10px;
    border-radius: 5%;
    border: none;
    color: #fff;
    transition: all 0.2s ease-in-out;
    background-color: #561482;

    option {
      padding: 8px;
      background-color: #f2f2f2;
      color: #000;
    }
  }

  form > :last-child {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const WrapperContent = styled.aside`
  width: 30%;
  margin-left: 1rem;
  padding-left: 1rem;

  border-left: 2px solid #fff;

  button {
    background-color: #561482;
    width: 100%;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    margin-left: 0;
    margin-top: 1rem;
    padding-left: 0;

    border-top: 2px solid #fff;

    button {
      height: 3.5rem;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 425px) {
    button {
      font-size: 0.7rem;
    }
  }
`
