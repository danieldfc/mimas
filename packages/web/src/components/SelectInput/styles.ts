import styled, { css } from 'styled-components'
import Tooltip from '../Tooltip'
import SelectCreatable from 'react-select/creatable'

interface ContainerProps {
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div.attrs({
  disabled: true
})<ContainerProps>`
  padding-bottom: 1rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  height: 3.5rem;

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
    width: 100%;
  }
`

export const Content = styled.div`
  display: flex;
  align-items: center;
  border-radius: 0.2rem;

  color: var(--secondary-color);

  label {
    color: var(--secondary-color);
  }

  width: 100%;

  div {
    border-color: var(--black-color);
    border-radius: 0.5rem;

    &::placeholder {
      color: var(--gray-color);
    }

    :hover {
      border-color: var(--secondary-color);
    }
  }
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin: 0 0.5rem;

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

export const Select = styled(SelectCreatable)`
  flex: 1;
  input {
    z-index: 999;
  }
`
