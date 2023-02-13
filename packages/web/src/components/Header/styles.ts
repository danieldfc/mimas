import styled from 'styled-components'

export const Container = styled.header`
  width: 100vw;
  max-width: 100vw;
  height: 6rem;

  padding: 24px 0;
  background: #ffffff;
  color: #000;

  @media (max-width: 768px) {
    padding: 12px 0;
    width: 100vw;
    height: 5rem;

    font-size: 0.8rem;
    line-height: 1rem;
  }
`

export const Content = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 54px;
    border-radius: 50%;
  }

  @media (max-width: 1280px) {
    width: 75%;

    > img {
      margin-right: 2rem;
    }
  }

  @media (max-width: 768px) {
    > img {
      margin-right: 0.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
  }

  @media (max-width: 425px) {
    margin: 0 0.9rem;

    > img {
      margin-right: 0;
      height: 2rem;
      border-radius: 50%;
    }
  }
`

export const WrapperButtons = styled.div`
  max-width: 1280px;
  margin: 0 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  button {
    background: none;
    border: 0;
    display: flex;

    > svg {
      color: #000;
      width: 24px;
      height: 24px;
    }
  }
`

export const Profile = styled.div`
  display: flex;
  align-items: flex-start;
  width: 250px;

  display: flex;
  flex-direction: column;
  margin-left: 16px;
  line-height: 24px;

  span {
    color: #000;
  }

  a {
    text-decoration: none;
    color: #7f3e98;
    &:hover {
      opacity: 0.8;
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
    width: 210px;
  }
`

export const Navigation = styled.nav`
  ul {
    display: flex;
    justify-content: center;
    align-items: center;

    > :last-child {
      margin-right: 0;
    }

    li {
      margin-right: 20px;

      a {
        text-decoration: none;
        color: #7f3e98;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  @media (max-width: 768px) {
    margin-top: 0.5rem;

    ul {
      width: 75%;
    }
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`
