import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;
`

export const HeaderWrapper = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  a {
    display: flex;
    align-items: center;
    color: var(--lighten-color);
  }

  div {
    display: flex;
    justify-content: space-between;

    margin-top: 2rem;

    > :last-child {
      color: var(--lighten-color);
      text-decoration: underline;
    }
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`
