import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div``

export const Wrapper = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    color: #cfbaf0;
    display: flex;
    align-items: center;
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;

  width: 90%;

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

    padding: 0.5rem 0;

    display: flex;
    flex-direction: row;
    justify-content: space-between;

    font-size: 1.3rem;
    line-height: 1.2rem;

    div {
      display: flex;
      justify-content: space-between;
      width: 60%;
    }

    a {
      color: #7f3e98;
      transition: all 0.3s;

      :hover {
        color: ${shade(0.2, '#7f3e98')};
      }
    }

    @media (max-width: 1280px) {
      div {
        width: 62.5%;
      }
    }

    @media (max-width: 768px) {
      font-size: 1rem;
      line-height: 1.4rem;

      div {
        flex-direction: column;
      }
    }
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

  @media (max-width: 768px) {
    button {
      width: 100%;
    }

    button + button {
      margin-left: 0.5rem;
    }
  }
`

export const MetadadoProducts = styled.ul`
  li + li {
    margin: 0.5rem 0;
    border-top: #000 solid 1px;
  }
`
