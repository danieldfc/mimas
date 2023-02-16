import styled from 'styled-components'

export const Container = styled.li`
  border: 2px solid var(--dark-color);
  border-radius: 5px;
  padding: 0.3rem;
  background-color: var(--white-color);
  color: var(--dark-color);

  & + li {
    margin-top: 0.3rem;
  }
`
