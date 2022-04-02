import React from 'react'

import { Container, StyledTable, TableWrapper } from './styles'

type IProps = {
  children: JSX.Element
  loading: boolean
}

export default function TableList({ children, loading }: IProps) {
  return (
    <Container>
      {!loading ? (
        <TableWrapper>
          <StyledTable>{children}</StyledTable>
        </TableWrapper>
      ) : (
        <p className="loading">Carregando...</p>
      )}
    </Container>
  )
}
