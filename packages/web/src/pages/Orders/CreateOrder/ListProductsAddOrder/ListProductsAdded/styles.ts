import styled from 'styled-components'

export const Container = styled.li`
  border: 2px solid var(--dark-color);
  border-radius: 0.3rem;
  padding: 0.3rem;
  background-color: var(--white-color);
  color: var(--dark-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  & + li {
    margin-top: 0.3rem;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 70%;
    margin-top: 0.4rem;
  }
`
