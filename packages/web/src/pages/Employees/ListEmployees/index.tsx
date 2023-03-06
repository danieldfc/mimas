import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Header } from '../../../components/Header'
import { useEmployee } from '../../../hooks/employee'
import { Container, Content, HeaderWrapper } from './styles'
import TableEmployees from './TableEmployees'

export default function ListEmployees() {
  const { employees } = useEmployee()

  return (
    <Container>
      <Header />

      <HeaderWrapper>
        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
        <div>
          <h3>Meus prestadores de serviço</h3>
          <Link to="/create-employee">Cadastrar novo prestador de serviço</Link>
        </div>
      </HeaderWrapper>

      <Content>
        <TableEmployees employees={employees} />
      </Content>
    </Container>
  )
}
