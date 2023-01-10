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

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #7f3e98;
      border-color: #7f3e98;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #7f3e98;
    `}

  input {
    flex: 1;
    border: 0;
    background: transparent;
    width: 100%;
  }
`

export const Content = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  border-radius: 0.2rem;
`

export const Error = styled(Tooltip)`
  height: 20px;
  margin: 0 0.5rem;

  svg {
    margin: 0;
  }
  span {
    background: #c53030;
    color: #fff;
    &::before {
      border-color: #c53030 transparent;
    }
  }
`

export const Select = styled(SelectCreatable)`
  flex: 1;
`
