import styled, { css } from 'styled-components'

import { shade } from 'polished'
import { StatusOrder } from '../../interfaces/Order'

export type LabelButton = 'small' | 'little' | 'average' | 'big'

export type TypeButton = StatusOrder | 'default'

interface ButtonProps {
  label: LabelButton
  typeButton: TypeButton
}

const lableTypeVariations = {
  small: css`
    width: 25%;
    height: 2rem;
  `,
  little: css`
    width: 50%;
    height: 4rem;

    @media (max-width: 1280px) {
      width: 60%;
      height: 3.5rem;
    }

    @media (max-width: 625px) {
      width: 70%;
    }

    @media (max-width: 425px) {
      width: 80%;
    }
  `,
  average: css`
    width: 75%;
    height: 6rem;
  `,
  big: css`
    width: 100%;
    height: 8rem;
  `
}

const typeButtonVariation = {
  finish: css`
    color: var(--success-color);
    background-color: var(--white-color);
    border: var(--dark-color) solid 1px;
    &:hover {
      color: var(--white-color);
    }
  `,
  cancel: css`
    color: var(--error-color);
    background-color: var(--white-color);
    border: var(--dark-color) solid 1px;
    &:hover {
      color: var(--white-color);
    }
  `,
  open: css`
    color: var(--info-color);
    background-color: var(--white-color);
    border: var(--dark-color) solid 1px;
    &:hover {
      color: var(--white-color);
    }
  `,
  default: css``
}

export const Container = styled.button<ButtonProps>`
  background: var(--secondary-color);
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  max-width: 100%;
  color: var(--lighten-color);
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#5e00a3')};
  }

  &:disabled {
    opacity: 0.3;
    cursor: no-drop;
  }

  ${props => lableTypeVariations[props.label || 'big']}

  ${props => typeButtonVariation[props.typeButton || 'default']}
`
