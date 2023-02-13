import React from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Header } from '../../components/Header'
import { Container, Content, HeaderWrapper } from './styles'

export default function Notifications() {
  return (
    <Container>
      <Header />
      <HeaderWrapper>
        <h3>Notificações</h3>

        <Link to="/dashboard">
          <FiArrowLeft />
          Voltar
        </Link>
      </HeaderWrapper>

      <Content></Content>
    </Container>
  )
}
