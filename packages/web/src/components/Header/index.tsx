import React, { useState } from 'react'
import { FiPower } from 'react-icons/fi'
import { Link } from 'react-router-dom'

import logoImg from '../../assets/logo.png'

import { useAuth } from '../../hooks/auth'
import NotificationHeader from './NotificationHeader'

import {
  Container,
  Content,
  Navigation,
  Profile,
  Wrapper,
  WrapperButtons
} from './styles'
import { navigateLink } from './util'

export function Header() {
  const [isOpenNotification, setIsOpenNotification] = useState(false)

  const { signOut, user } = useAuth()
  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Costura" />
        <Wrapper>
          <Profile>
            <span>Bem vindo,&nbsp;</span>
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
        </Wrapper>
        <WrapperButtons>
          <NotificationHeader
            isOpenNotification={isOpenNotification}
            onClick={() => setIsOpenNotification(!isOpenNotification)}
          />
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </WrapperButtons>
      </Content>
    </Container>
  )
}
