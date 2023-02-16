import styled from 'styled-components'

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: calc(100vh - 2.5rem * 2);

  @media (max-width: 625px) {
    font-size: 14px;
    line-height: 18px;
  }
`

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  margin-bottom: 2rem;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }

  @media (max-width: 425px) {
    margin-bottom: 1rem;
    font-size: 0.8rem;
  }
`

export const Content = styled.section`
  display: flex;
  width: 95vw;
  height: 95vh;
  border-radius: 0.9rem;
  padding: 1.5rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;

    padding: 0;
    gap: 2rem;
  }
`

export const WrapperArticle = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;

  &.login-left {
    width: 50vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    form {
      background-color: var(--white-color);
      width: 85%;
      color: var(--black-color);
      border-radius: 3rem;

      padding: 2rem;

      button {
        width: 100%;
        height: 3.5rem;

        background-image: linear-gradient(
          45deg,
          var(--primary-color),
          var(--secondary-color),
          var(--primary-color),
          var(--secondary-color)
        );
        background-size: 300% 100%;
        height: 56px;
        border-radius: 10px;
        border: 0;
        padding: 0 16px;
        max-width: 100%;
        color: var(--lighten-color);
        font-weight: 500;
        margin-top: 16px;
        transition: background-color 0.2s;
        box-shadow: 0 2px 10px 0 var(--secondary-color);

        &:hover {
          background-position: 100% 0;
          moz-transition: all 0.4s ease-in-out;
          -o-transition: all 0.4s ease-in-out;
          -webkit-transition: all 0.4s ease-in-out;
          transition: all 0.4s ease-in-out;
        }
      }
    }

    @media (max-width: 1280px) {
      padding: 1rem;

      form {
        background-color: var(--white-color);
        color: var(--black-color);
        border-radius: 3rem;
      }
    }

    @media (max-width: 768px) {
      width: 75%;
      height: 45vh;
      justify-content: flex-start;

      form {
        width: 100%;
      }
    }

    @media (max-width: 425px) {
      width: 95%;
    }
  }

  &.login-right {
    width: 50vw;

    img {
      width: 20rem;
      height: 20rem;
      border-radius: 50%;
    }

    @media (max-width: 1280px) {
      img {
        width: 18rem;
        height: 18rem;
      }
    }

    @media (max-width: 768px) {
      img {
        width: 15rem;
        height: 15rem;
      }
    }

    @media (max-width: 425px) {
      height: 15vh;

      img {
        width: 10rem;
        height: 10rem;
      }
    }
  }
`

export const Separator = styled.div`
  border-right: 1px solid var(--white-color);
  height: 30%;
  position: absolute;
  left: 55%;
  top: 35%;

  @media (max-width: 1280px) {
    left: 53%;
  }

  @media (max-width: 768px) {
    display: none;
  }
`
