import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #333333;

  @media (max-width: 625px) {
    font-size: 14px;
    line-height: 18px;
  }
`

export const Content = styled.div`
  background-color: #fff;
  width: 23vw;
  height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 30px;

  border-radius: 0.9rem;

  form {
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  @media (max-width: 1280px) {
    width: 45%;
  }

  @media (max-width: 625px) {
    width: 75%;
  }

  @media (max-width: 425px) {
    width: 100%;
  }
`
