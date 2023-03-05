import styled from 'styled-components'

export const Container = styled.aside`
  width: 30%;
  margin-left: 1rem;
  padding-left: 1rem;

  border-left: 2px solid var(--white-color);

  button {
    background-color: var(--secondary-color);
    width: 100%;
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    margin-left: 0;
    margin-top: 1rem;
    padding-left: 0;

    border-top: 2px solid var(--white-color);

    button {
      height: 3.5rem;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 425px) {
    button {
      font-size: 0.7rem;
    }
  }
`

export const ListProduct = styled.ul`
  overflow: auto;
  height: 300px;

  > :first-child {
    margin-top: 0.5rem;
  }
`
