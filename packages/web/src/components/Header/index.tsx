import React from 'react'
import { FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/machine.png'

import { useAuth } from '../../hooks/auth'

import { Container, Content, Navigation, Profile } from './styles'
import { navigateLink } from './util'

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
        <Navigation>
          <ul>
            {navigateLink.map(nav => (
              <li key={nav.href}>
                <Link to={nav.href}>{nav.name}</Link>
              </li>
            ))}
          </ul>
        </Navigation>
        <button type="button" onClick={signOut}>
          <FiPower />
        </button>
      </Content>
    </Container>
  )
}
