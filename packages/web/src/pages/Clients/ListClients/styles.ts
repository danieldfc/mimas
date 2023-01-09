import styled from 'styled-components'

export const Container = styled.div``

export const HeaderWrapper = styled.div`
  max-width: 1240px;
  margin: 64px auto;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    color: #cfbaf0;
  }

  div {
    display: flex;
    justify-content: space-between;
    width: 250px;

    > :last-child {
      color: #cfbaf0;
      text-decoration: underline;
    }
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 64px auto;

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
