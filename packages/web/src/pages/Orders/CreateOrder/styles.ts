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
    color: var(--lighten-color);
  }
`

export const SelectorClient = styled.div`
  display: flex;

  label {
    color: var(--white-color);
  }

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
    background-color: var(--secondary-color);

    &:hover {
      background-color: ${shade(0.2, '#5e00a3')};
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
    color: var(--white-color);
    transition: all 0.2s ease-in-out;
    background-color: var(--secondary-color);

    option {
      padding: 8px;
      background-color: var(--lighten-color);
      color: var(--dark-color);
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

  border-left: 2px solid var(--white-color);

  button {
    background-color: var(--secondary-color);
    width: 100%;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    margin-left: 0;
    margin-top: 1rem;
    padding-left: 0;

    border-top: 2px solid var(--white-color);

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

export const WrapperDate = styled.aside`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  & > div {
    &:first-child {
      width: 50%;
      margin-top: 0.3rem;
    }

    &:last-child {
      width: 50%;
      margin-top: 0.3rem;
    }
  }

  @media (max-width: 425px) {
    flex-direction: column;

    & > div {
      &:first-child {
        width: 100%;
        margin-top: 0.3rem;
      }

      &:last-child {
        width: 100%;
        margin-top: 0;
      }
    }
  }
`
