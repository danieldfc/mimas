import { lighten } from 'polished'
import styled, { css } from 'styled-components'

export const Container = styled.div``

export const HeaderWrapper = styled.header`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    color: #cfbaf0;
  }
`

export const Content = styled.main`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;
`

type NotificationItemProps = {
  isReaded: boolean
}

const notificationTypeRead = {
  'is-readed': css`
    border: 0.15rem solid #2e656a;
  `,
  'is-not-readed': css`
    border: 0.15rem solid #c53030;
  `
}

export const NotificationItem = styled.a<NotificationItemProps>`
  background: white;
  color: #7f3e98;
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 1rem;
  }

  a {
    color: #7f3e98;
    transition: color 0.2s ease 0s;

    :hover {
      color: ${lighten(0.2, '#7f3e98')};
    }
  }

  button {
    border: none;
    background: none;
    color: #7f3e98;
    font-size: 1.2rem;
    transition: color 0.2s ease 0s;

    :hover {
      color: ${lighten(0.2, '#7f3e98')};
    }
  }

  ${props =>
    notificationTypeRead[props.isReaded ? 'is-readed' : 'is-not-readed']}
`

export const ContainerWithoutNotification = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3rem;
  margin: 0 auto;

  background-color: white;
  color: black;
  padding: 3rem;

  border-radius: 1rem;
`
