import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.main``

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

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`

export const Content = styled.section`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 1rem;
  }

  button {
    background-color: var(--secondary-color);
    width: 100%;

    &:hover {
      background-color: ${shade(0.2, '#5e00a3')};
    }
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`

export const WrapperPix = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;

  > div:first-child {
    width: 40%;
  }

  > div:last-child {
    width: 100%;
  }

  @media (max-width: 768px) {
    > div:first-child {
      width: 45%;
    }

    > div:last-child {
      width: 55%;
    }
  }

  @media (max-width: 425px) {
    flex-direction: column;
    gap: 0;

    > div:first-child {
      width: 100%;
      padding-bottom: 0;
    }
    > div:last-child {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
`
