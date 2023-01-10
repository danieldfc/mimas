import styled from 'styled-components'

export const Container = styled.div``

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
    color: #cfbaf0;
  }

  div {
    display: flex;
    justify-content: space-between;

    margin-top: 2rem;

    > :last-child {
      color: #cfbaf0;
      text-decoration: underline;
    }
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 64px auto;

  width: 90%;

  ul {
    display: flex;
    align-items: center;
    flex-direction: row;

    > li {
      margin-right: 20px;
    }
  }
`

export const ContainerWithoutClient = styled.div`
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
