import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'

import { Container, Content } from './styles'

export function CreateOrder() {
  return (
    <Container>
      <Header />
      <Content>
        <h3>Criar um novo pedido</h3>

        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
      </Content>
    </Container>
  )
}
