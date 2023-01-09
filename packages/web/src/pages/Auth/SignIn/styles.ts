import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #333333;
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
`
