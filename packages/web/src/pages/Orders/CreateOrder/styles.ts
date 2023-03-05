import styled from 'styled-components'

export const Container = styled.main`
  > h3 {
    max-width: 1240px;
    margin: -1.5rem auto;
    padding: 0 2.5rem;
  }
`

export const HeaderWrapper = styled.aside`
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
`

export const Content = styled.section`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
