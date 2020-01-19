import styled from 'styled-components';

import { darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  max-width: 600px;
  margin: 50px auto;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      border: 2px solid transparent;
      transition: border 0.2s;
      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
      &:hover {
        border: 2px solid ${darken(0.15, `#9b59b6`)};
      }
    }
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 10px 0 20px;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: ${colors.blueDark};
      font-weight: bold;
      color: ${colors.white};
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.5s;
      &:hover {
        background: ${darken(0.06, `${colors.blueDark}`)};
      }
    }
  }
  > button {
    width: 100%;
    margin: 10px 0 0;
    height: 44px;
    background: ${colors.red};
    font-weight: bold;
    color: ${colors.white};
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.5s;
    &:hover {
      background: ${darken(0.01, `${colors.red}`)};
    }
  }
`;
