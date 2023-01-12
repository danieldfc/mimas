import styled from 'styled-components'

export const Container = styled.li`
  p {
    font-size: 0.9rem;
    color: #333;
  }

  @media (max-width: 768px) {
    p {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 425px) {
    p {
      font-size: 0.7rem;
    }
  }
`
