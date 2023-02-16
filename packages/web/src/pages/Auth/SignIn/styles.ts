import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: calc(100vh - 2.5rem * 2);

  @media (max-width: 625px) {
    font-size: 14px;
    line-height: 18px;
  }
`

export const Header = styled.header``

export const Content = styled.section`
  display: flex;
  width: 95vw;
  height: 95vh;
  /* background-color: var(--white-color); */
  border-radius: 0.9rem;
  padding: 1.5rem;
  gap: 1rem;

  img {
    width: 100%;
  }

  /*
  width: 23vw;
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;




  form {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  } */

  /* @media (max-width: 1280px) {
    width: 45%;
  }

  @media (max-width: 625px) {
    width: 75%;
  }

  @media (max-width: 425px) {
    width: 100%;
  } */
`

export const WrapperArticle = styled.article`
  &.login-left {
    background-color: var(--white-color);
  }

  &.login-right {
  }
`
