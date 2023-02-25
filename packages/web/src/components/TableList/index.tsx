import React from 'react'

import { Container, StyledTable, TableWrapper } from './styles'

type IProps = React.InputHTMLAttributes<HTMLTableElement> & {
  children: React.ReactNode
  loading?: boolean
}

export default function TableList({
  children,
  loading = false,
  ...props
}: IProps) {
  return (
    <Container>
      {!loading ? (
        <TableWrapper {...props}>
          <StyledTable>{children}</StyledTable>
        </TableWrapper>
      ) : (
        <p className="loading">Carregando...</p>
      )}
    </Container>
  )
}
