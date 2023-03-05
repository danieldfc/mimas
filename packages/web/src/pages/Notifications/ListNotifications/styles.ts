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
    color: var(--lighten-color);
  }

  button {
    display: flex;
    align-items: center;
    color: var(--lighten-color);

    background: none;
    border: none;
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
    border: 0.15rem solid var(--error-color);
  `
}

export const NotificationItem = styled.aside<NotificationItemProps>`
  background: var(--white-color);
  color: var(--secondary-color);
  padding: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & + & {
    margin-top: 1rem;
  }

  a {
    color: var(--secondary-color);
    transition: color 0.2s ease 0s;

    :hover {
      color: ${lighten(0.2, '#5e00a3')};
    }
  }

  button {
    border: none;
    background: none;
    color: var(--secondary-color);
    font-size: 1.2rem;
    transition: color 0.2s ease 0s;

    :hover {
      color: ${lighten(0.2, '#5e00a3')};
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

  background-color: var(--white-color);
  color: var(--black-color);
  padding: 3rem;

  border-radius: 1rem;
`
