import styled from 'styled-components'

export const Container = styled.div``

export const Wrapper = styled.div`
  max-width: 1240px;
  margin: 64px auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  a {
    color: #cfbaf0;
    text-decoration: underline;
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 64px auto;
  display: flex;
  flex-direction: column;

  background-color: white;
  color: #000;

  border-radius: 5px;

  padding: 1rem;

  > h2 {
    border-bottom: #000 solid 1px;
    margin-bottom: 1rem;
    color: #7f3e98;
  }

  > p {
    color: #222;
    margin-bottom: 0.5rem;
  }
`

export const WrapperButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  > button {
    margin: 0;
  }
`

export const MetadadoProducts = styled.ul`
  li + li {
    margin: 0.5rem 0;
    border-top: #000 solid 1px;
  }
`
