import styled from 'styled-components'

export const Container = styled.div``

export const HeaderWrapper = styled.div`
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

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  form > button:last-child {
    width: 100%;
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;

    form svg {
      display: none;
    }
  }
`
