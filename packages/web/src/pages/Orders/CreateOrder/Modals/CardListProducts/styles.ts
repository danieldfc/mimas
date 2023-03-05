import styled from 'styled-components'

export const Container = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
  max-height: 270px;
  overflow: auto;

  li + li {
    margin-bottom: 20px;
  }
`

export const Title = styled.h3`
  margin-bottom: 1rem;
  color: var(--dark-color);
`
