import styled from 'styled-components'

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
  padding: 2.5rem;

  background-color: #fff;
  color: #000;
  border-radius: 0.5rem;

  height: 20rem;

  display: flex;
  flex-direction: column;

  align-items: center;

  width: 45%;
  height: auto;

  > p {
    background-color: #cfbaf0;
    display: flex;
    width: 85%;
    margin-top: 2rem;
    border-radius: 0.5rem;
    padding: 1rem;
    color: #000;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1280px) {
    width: 70%;
  }

  @media (max-width: 768px) {
    width: 90%;

    > p {
      width: 100%;
    }
  }
`
