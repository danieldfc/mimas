import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Container, Content, Wrapper } from './styles'

export function Specifications() {
  return (
    <Container>
      <Header />

      <Content>
        <Wrapper>
          <h3>Especificações do pedido</h3>
          <Link to="/dashboard">
            <FiArrowLeft />
            Voltar
          </Link>
        </Wrapper>
      </Content>
    </Container>
  )
}
