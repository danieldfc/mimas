import styled, { css } from 'styled-components'
import { animated } from 'react-spring'
import { lighten } from 'polished'

interface ContainerProps {
  type?: 'success' | 'error' | 'info'
  $hasDescription: boolean
}

const toastTypeVariations = {
  info: css`
    background: ${lighten(0.7, '#002982')};
    color: var(--info-color);
  `,
  success: css`
    background: ${lighten(0.7, '#008200')};
    color: var(--success-color);
  `,
  error: css`
    background: ${lighten(0.7, '#82001b')};
    color: var(--error-color);
  `
}

export const Container = styled(animated.div)<ContainerProps>`
  width: 360px;
  position: relative;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  & + div {
    margin-top: 8px;
  }

  ${props => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;
    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    opacity: 0.6;
    border: 0;
    background: transparent;
    color: inherit;
  }

  ${props =>
    !props.$hasDescription &&
    css`
      align-items: center;
      svg {
        margin-top: 0;
      }
    `}
`
