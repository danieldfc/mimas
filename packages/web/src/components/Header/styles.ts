import styled from 'styled-components'

export const Container = styled.header`
  padding: 24px 0;
  background: #ffffff;
  height: 6rem;
  color: #000;
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

  button {
    margin-left: auto;
    background: transparent;
    border: 0;

    svg {
      color: #000;
      width: 24px;
      height: 24px;
    }
  }

  @media (max-width: 1280px) {
    width: 75%;
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
`

export const Navigation = styled.nav`
  ul {
    display: flex;

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
`
