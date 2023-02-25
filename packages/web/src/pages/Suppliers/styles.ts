import styled from 'styled-components'

export const Container = styled.div``

export const Wrapper = styled.div`
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

export const ContainerWithoutSupplier = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 3rem;

  background-color: var(--white-color);
  color: var(--black-color);
  padding: 3rem;

  border-radius: 1rem;
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;
`

export const AsideSeparator = styled.aside`
  display: flex;
  margin: 0 auto;
  justify-content: center;

  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`
