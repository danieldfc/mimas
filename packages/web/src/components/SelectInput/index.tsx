import React, { CSSProperties } from 'react'

import Select, { Props } from 'react-select'

import { Container } from './styles'

export type ItemSelect = {
  value: string
  label: string
}

type SelectInputProps = Props & {
  itens: ItemSelect[]
  title: string
}

export default function SelectInput({
  itens,
  title,
  id,
  onChange
}: SelectInputProps) {
  const style: { [key: string]: CSSProperties } = {
    blockquote: {
      fontStyle: 'italic',
      fontSize: '.75rem',
      margin: '1rem 0'
    },
    label: {
      fontSize: '.75rem',
      fontWeight: 'bold',
      lineHeight: 2
    }
  }

  return (
    <Container>
      <label style={style.label} id="aria-label" htmlFor="aria-example-input">
        {title}:
      </label>

      <Select
        placeholder="Selecione um cliente..."
        inputId={id}
        options={itens}
        onChange={onChange}
      />
    </Container>
  )
}
