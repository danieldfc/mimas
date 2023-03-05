import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.aside`
  width: 70%;

  button {
    background-color: var(--secondary-color);

    &:hover {
      background-color: ${shade(0.2, '#5e00a3')};
    }
  }

  label {
    color: var(--white-color);
  }

  form > :first-child {
    height: auto;
    margin-bottom: 0.5rem;
    padding-bottom: 0;
  }

  form > :last-child {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
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
