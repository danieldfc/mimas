import { shade } from 'polished'
import styled, { css } from 'styled-components'

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0 1rem 0;
`

export const PaginationButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

type PaginationItemProps = {
  isSelect?: boolean
  isSelector?: boolean
}

export const PaginationItem = styled.div<PaginationItemProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.isSelect &&
    css`
      background: var(--primary-color);
      padding: 0.6rem;
      border-radius: 0.3rem;
    `}

  ${props =>
    !props.isSelect &&
    !props.isSelector &&
    css`
      background: none;
      padding: 0.6rem;
      border-radius: 0.3rem;
      margin: 0 0.5rem;
      :hover {
        background: var(--primary-color);
      }
    `}

  ${props =>
    !props.isSelect &&
    props.isSelector &&
    css`
      background: none;
      padding: 0.5rem;
      border-radius: 0.3rem;
      transition: all 0.2s ease 0s;

      :hover {
        background: var(--primary-color);
      }
    `}
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
    background-color: var(--orange-color);
    transition: all 0.4s;
    width: 30%;
    margin-top: 0;
    color: var(--dark-color);
    font-size: 0.9rem;

    :hover {
      background-color: ${shade(0.1, '#f09000')};
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

export const SelectTypeProduct = styled.div`
  label {
    display: none;
  }
`

export const WrapperFormDiv = styled.div`
  display: flex;

  margin-top: 0.5rem;
  gap: 0.5rem;

  > div {
    margin: 0 !important;
    width: 50%;
  }

  @media (max-width: 768px) {
    flex-direction: column;

    > div {
      margin: 0 !important;
      width: 100%;
    }
  }
`
