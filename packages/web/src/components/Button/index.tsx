import React, { ButtonHTMLAttributes } from 'react'

import { Container, LabelButton } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  label?: LabelButton
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  label = 'big',
  ...rest
}) => (
  <Container type="button" label={label} {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
)

export default Button
