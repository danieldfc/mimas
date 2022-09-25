import styled from 'styled-components'

export const Container = styled.li`
  border: 2px solid #000;
  border-radius: 5px;
  padding: 0.3rem;
  background-color: #fff;
  color: #000;

  & + li {
    margin-top: 0.3rem;
  }
`
