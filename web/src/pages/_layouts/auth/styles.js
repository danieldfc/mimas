import styled from 'styled-components';

/**
 * fonts
 *
 * em: relativo ao elemento pai
 * rem: relativo ao root (html) - 16px
 */

export const Wrapper = styled.div`
  height: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #7159c1, #ab59c1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 415px;
  text-align: center;
`;
