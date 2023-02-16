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
