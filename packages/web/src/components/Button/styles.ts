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

    @media (max-width: 1440px) {
      width: 35%;
      height: 2.5rem;

      font-size: 0.8rem;
      line-height: 1rem;
    }

    @media (max-width: 1280px) {
      width: 40%;
      height: 2.5rem;

      font-size: 0.8rem;
      line-height: 1rem;
    }

    @media (max-width: 625px) {
      width: 70%;
    }

    @media (max-width: 425px) {
      width: 80%;
    }
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
    color: green;
    background-color: white;
    border: #000 solid 1px;
    &:hover {
      color: white;
    }
  `,
  cancel: css`
    color: red;
    background-color: white;
    border: #000 solid 1px;
    &:hover {
      color: white;
    }
  `,
  open: css`
    color: blue;
    background-color: white;
    border: #000 solid 1px;
    &:hover {
      color: white;
    }
  `,
  default: css``
}

export const Container = styled.button<ButtonProps>`
  background: #7f3e98;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  max-width: 100%;
  color: #eee;
  font-weight: 500;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${shade(0.2, '#7f3e98')};
  }

  &:disabled {
    opacity: 0.3;
    cursor: no-drop;
  }

  ${props => lableTypeVariations[props.label || 'big']}

  ${props => typeButtonVariation[props.typeButton || 'default']}
`
