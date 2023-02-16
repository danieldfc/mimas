import { useField } from '@unform/core'
import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import { Props } from 'react-select'

import { Container, Content, Error, Select } from './styles'

export type ItemSelect = {
  value: string
  label: string
}

interface SelectInputProps extends Props {
  itens: ItemSelect[]
  title: string
  containerStyle?: object
  name: string
  value?: string
}

export default function SelectInput({
  itens,
  title,
  id,
  onChange,
  name,
  containerStyle = {},
  isClearable,
  isMulti
}: SelectInputProps) {
  const selectRef = useRef(null)

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleSelectBlur = useCallback(() => {
    setIsFocused(false)
    // @ts-ignore
    setIsFilled(!!selectRef.current?.value)
  }, [])

  const handleSelectFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

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
    <Container
      isErrored={!!error}
      isFocused={isFocused}
      isFilled={isFilled}
      style={containerStyle}
    >
      <label style={style.label} id="aria-label" htmlFor="aria-example-input">
        {title}:
      </label>

      <Content>
        <Select
          placeholder="Selecione um cliente..."
          inputId={id}
          options={itens}
          onChange={onChange}
          onFocus={handleSelectFocus}
          onBlur={handleSelectBlur}
          defaultValue={defaultValue}
          ref={selectRef}
          isClearable={isClearable}
          noOptionsMessage={() => 'Nenhum cliente encontrado'}
          isMulti={isMulti}
        />

        {error && (
          <Error title={error}>
            <FiAlertCircle size={20} />
          </Error>
        )}
      </Content>
    </Container>
  )
}
