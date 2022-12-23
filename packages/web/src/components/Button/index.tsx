import React, { ButtonHTMLAttributes } from 'react'

import { Container, LabelButton, TypeButton } from './styles'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  label?: LabelButton
  typeButton?: TypeButton
}

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  label = 'big',
  typeButton = 'default',
  ...rest
}) => (
  <Container type="button" label={label} typeButton={typeButton} {...rest}>
    {loading ? 'Carregando...' : children}
  </Container>
)

export default Button
