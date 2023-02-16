import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div``

export const Wrapper = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: var(--lighten-color);
    display: flex;
    align-items: center;
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;

  width: 90%;

  display: flex;
  flex-direction: column;

  background-color: var(--white-color);
  color: var(--dark-color);

  border-radius: 5px;

  padding: 1rem;

  div.order-title {
    display: flex;
    justify-content: space-between;

    border-bottom: var(--dark-color) solid 1px;
    margin-bottom: 1rem;
    color: var(--secondary-color);
    padding: 0.5rem 0;

    font-size: 1rem;
  }

  a {
    color: var(--secondary-color);
    transition: all 0.3s;

    :hover {
      color: ${shade(0.2, '#5e00a3')};
    }
  }

  > p {
    color: var(--gray-dark-color);
    margin-bottom: 0.5rem;
  }
`

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  > button {
    margin: 0;
  }

  @media (max-width: 768px) {
    button {
      width: 100%;
    }

    button + button {
      margin-left: 0.5rem;
    }
  }
`

export const MetadadoProducts = styled.ul`
  li + li {
    margin: 0.5rem 0;
    border-top: var(--dark-color) solid 1px;
  }
`
