import styled from 'styled-components';

import { lighten, darken } from 'polished';

import colors from '~/styles/colors';

export const Container = styled.div`
  background: #fff;
  padding: 20px 30px;
  border-radius: 8px;

  form {
    display: flex;
    flex-direction: column;
    img {
      align-self: center;
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }

    label {
      display: flex;
      margin: 0 0 5px 0;
      font-weight: bold;
      color: #444;
      font-size: 14px;
    }
    input {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #222;
      margin: 0 0 15px 0;
      transition: box-shadow 0.3s;

      &:focus {
        box-shadow: 0 0 3px ${darken(0.05, colors.primary)};
      }
      &:hover {
        box-shadow: 0 0 4px ${colors.primary};
      }
      &::placeholder {
        color: #999;
      }
    }
    span {
      color: #3b3b98;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.3s;
      &:hover {
        background: ${lighten(0.03, '#7159c1')};
      }
      &:disabled {
        background: #7159c1;
        transition: none;
        color: rgba(255, 255, 255, 0.5);
        cursor: not-allowed;
      }
    }
    div {
      margin-top: 20px;
      font-weight: 550;
      color: #333;

      a {
        margin-left: 3px;
        color: #7159c1;
        margin-top: 15px;
        font-size: 14px;
        opacity: 0.8;
        transition: opacity 0.3s;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
`;
