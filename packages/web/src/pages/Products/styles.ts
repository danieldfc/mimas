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
    width: 245px;

    > :last-child {
      color: #cfbaf0;
      text-decoration: underline;
    }
  }
`