import styled from 'styled-components'

export const Container = styled.div``

export const Content = styled.div`
  max-width: 1240px;
  margin: 2.5rem auto;
  padding: 0 2.5rem;

  @media (max-width: 425px) {
    padding: 0 1.5rem;
  }
`

export const SelectSupplier = styled.ul`
  display: flex;
  flex-direction: column;

  height: 50vh;

  background-color: var(--white-color);
  color: var(--dark-color);
  padding: 0.7rem;

  border-radius: 0.4rem;

  li + li {
    margin-top: 0.3rem;
  }

  overflow: auto;

  @media (max-width: 1280px) {
    font-size: 0.9rem;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    width: 90%;
    margin: 0 auto;
    height: 3rem;

    font-size: 0.8rem;

    align-items: center;
    justify-content: start;

    overflow-x: auto;
    flex-wrap: nowrap;
    max-width: 90%;

    margin-bottom: 1rem;

    li {
      display: flex;
      align-items: center;
      justify-content: center;

      input {
        margin-right: 0.3rem;
      }

      label {
        margin-right: 1rem;
      }
    }

    li + li {
      margin-left: 1rem;
      margin-top: 0;
    }
  }
`

export const WrapperFormButton = styled.div`
  display: flex;

  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: column;

    button {
      width: 100%;
      margin: 0;
      height: 3rem;
    }

    button + button {
      margin: 0.5rem 0 0 0;
    }
  }

  @media (max-width: 425px) {
    margin-top: 0.5rem;
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
    width: 60%;
  }

  @media (max-width: 1280px) {
    > div:first-child {
      font-size: 0.8rem;
      width: 50%;
    }

    > div:last-child {
      width: 50%;

      input {
        font-size: 0.8rem;
      }
    }
  }

  @media (max-width: 768px) {
    > div:first-child {
      width: 50%;
    }

    > div:last-child {
      width: 50%;
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
