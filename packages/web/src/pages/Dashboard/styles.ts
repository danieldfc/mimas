import styled from 'styled-components'

export const Container = styled.div``

export const Content = styled.div`
  max-width: 1240px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 30px;
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  a {
    color: #cfbaf0;
    text-decoration: underline;
  }
`
