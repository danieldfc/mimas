import styled, { css } from 'styled-components'

import { shade } from 'polished'

export type LabelButton = 'small' | 'little' | 'average' | 'big'

interface ButtonProps {
  label: LabelButton
}

const lableTypeVariations = {
  small: css`
    width: 25%;
    height: 2rem;
  `,
  little: css`
    width: 50%;
    height: 4rem;
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
`
