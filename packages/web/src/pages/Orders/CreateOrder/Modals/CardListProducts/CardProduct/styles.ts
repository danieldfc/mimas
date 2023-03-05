import styled from 'styled-components'

export const Container = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-width: 1px;
  border-style: solid;
  border-color: var(--dark-color);
  border-radius: 5px;
  color: var(--dark-color);
  padding: 0.3rem 0.5rem;
  margin-bottom: 0.6rem;

  div {
    strong {
      margin-right: 0.5rem;
    }

    input {
      border: 1px solid var(--dark-color);
      border-radius: 8px;
      padding: 5px;
      width: 62px;
      height: 30px;
    }
  }
`
