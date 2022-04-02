import React from 'react'
import { FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/machine.png'

import { useAuth } from '../../hooks/auth'

import { Container, Content, Profile } from './styles'

export function Header() {
  const { signOut, user } = useAuth()
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Costura" />
        <Profile>
          <span>Bem vindo,</span>
          <Link to="/profile">
            <strong>{user.name}</strong>
          </Link>
        </Profile>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </Content>
    </Container>
  )
}
