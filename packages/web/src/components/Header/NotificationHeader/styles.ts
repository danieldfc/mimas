import { lighten } from 'polished'
import styled, { css } from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  width: 46px;
  height: 46px;
  border: none;
  border-radius: 5px;
  transition: background 0.2s ease 0s;

  svg {
    color: #000;
    width: 24px;
    height: 24px;
    margin-right: 1.5rem;
  }
`

type ButtonIconProps = {
  isOpen: boolean
  hasNotification: boolean
}

export const ButtonIcon = styled.button<ButtonIconProps>`
  ${props =>
    props.isOpen &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: calc(100% + 5px);
        left: 25%;
        transform: translateX(-50%);
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 0px 7.5px 8px;
        border-color: transparent transparent #7f3e98;
        z-index: 2;
      }
    `}

  ${props =>
    props.hasNotification &&
    css`
      &::after {
        content: '';
        display: block;
        position: absolute;
        right: 1.55rem;
        top: 0.8rem;
        border-radius: 50%;
        background: rgb(232, 63, 91);
        width: 8px;
        height: 8px;
      }
    `}
`

export const Content = styled.div`
  a {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${lighten(0.2, '#7f3e98')};
    align-items: center;
    background: white;
    transition: all 0.2s ease 0s;
    padding: 16px 20px;
    :hover {
      background-color: ${lighten(0.5, '#7f3e98')};
      color: ${lighten(0, '#7f3e98')};
    }

    h3 {
      font-size: 1rem;
    }
  }
`

export const Wrapper = styled.div<{ isOpen: boolean }>`
  position: absolute;
  right: 0px;
  top: calc(100% + 13px);
  width: 448px;
  box-shadow: rgb(0 0 0 / 60%) 0px 5px 20px;
  display: block;
  overflow: hidden;

  header {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    background: #7f3e98;
    color: #fff;
    height: 50px;
    padding: 0px 20px;
    border-radius: 5px 5px 0px 0px;

    button {
      color: white;
      background-color: none;
      border: none;
      transition: color 0.2s ease 0s;

      :hover {
        color: ${lighten(0.4, '#7f3e98')};
      }
    }
  }

  > a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 40px;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    text-transform: uppercase;
    color: ${lighten(0.5, '#7f3e98')};
    background: #7f3e98;
    border-radius: 0px 0px 5px 5px;
    transition: color 0.2s ease 0s;
    text-decoration: none;

    :hover {
      color: ${lighten(0.2, 'white')};
    }
  }
`

export const NotExistNotification = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${lighten(0.2, '#7f3e98')};
  align-items: center;
  background: white;
  padding: 20px;
`
