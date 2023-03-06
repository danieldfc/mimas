import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
`

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  form > button:last-child {
    width: 100%;
  }

  @media (max-width: 425px) {
    padding: 0 1.5rem;

    form svg {
      display: none;
    }
  }
`

export const HeaderWrapper = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    color: var(--lighten-color);
  }
`

export const WrapperPix = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 0.3rem;

  > div:first-child {
    width: 40%;
  }

  > div:last-child {
    width: 100%;
  }

  @media (max-width: 768px) {
    > div:first-child {
      width: 45%;
    }

    > div:last-child {
      width: 55%;
    }
  }

  @media (max-width: 425px) {
    flex-direction: column;
    gap: 0;

    > div:first-child {
      width: 100%;
      padding-bottom: 0;
    }
    > div:last-child {
      margin-top: 0.5rem;
      width: 100%;
    }
  }
`
