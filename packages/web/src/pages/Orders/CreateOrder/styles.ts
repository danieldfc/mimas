import { shade } from 'polished'
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
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 64px auto;

  button {
    background-color: #561482;

    &:hover {
      background-color: ${shade(0.2, '#561482')};
    }
  }

  label {
    margin-right: 5px;
  }

  select {
    margin-bottom: 16px;
    padding: 10px;
    border-radius: 5%;
    border: none;
    color: #fff;
    transition: all 0.2s ease-in-out;
    background-color: #561482;

    option {
      padding: 8px;
      background-color: #f2f2f2;
      color: #000;
    }
  }

  form > div:last-child {
    display: flex;
    flex-direction: column;
    align-items: center;

    button {
      width: 100%;
    }
  }
`
