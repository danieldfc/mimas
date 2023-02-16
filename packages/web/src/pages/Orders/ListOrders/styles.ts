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
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`

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
`

export const ContainerWithoutOrder = styled.div`
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
