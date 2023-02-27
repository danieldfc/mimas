import styled, { css } from 'styled-components'

import Tooltip from '../Tooltip'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div.attrs({
  disabled: true
})<ContainerProps>`
  background: var(--white-color);
  border-radius: 10px;
  border: 1.7px solid var(--dark-color);
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  color: var(--gray-color);
  height: 3rem;

  & + div {
    margin-top: 8px;
  }
  ${props =>
    props.isErrored &&
    css`
      border-color: var(--error-color);
    `}
  ${props =>
    props.isFocused &&
    css`
      color: var(--secondary-color);
      border-color: var(--secondary-color);
    `}
  ${props =>
    props.isFilled &&
    css`
      color: var(--secondary-color);
    `}
  input {
    flex: 1;
    border: 0;
    background: transparent;
    color: var(--dark-color);
    width: 100%;
    &::placeholder {
      color: var(--gray-color);
    }
  }
  svg {
    margin-right: 16px;
  }

  @media (max-width: 425px) {
    svg {
      display: none;
    }
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
    color: var(--error-color);
  }
  span {
    background: var(--error-color);
    color: var(--white-color);
    &::before {
      border-color: var(--error-color) transparent;
    }
  }
`

export const Wrapper = styled.div`
  label {
    display: inline;
    background-color: var(--white-color);
    position: absolute;
    margin-bottom: 15px;
    font-size: 0.8rem;
    padding: 0 10px;
    transform: translate(1rem, -7px);
  }

  & + & {
    margin-top: 0.5rem;
  }
`
