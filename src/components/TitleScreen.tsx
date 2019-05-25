/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

interface TitleScreenProps {
  startGame: () => void;
}

const TitleScreen: FC<TitleScreenProps> = ({ startGame }) => {
  return (
    <Container>
      <Button type="button" onClick={startGame}>
        ゲームを始める
      </Button>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  z-index: 2;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = styled.button`
  background: #e0e1e2;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 0.28571429rem;
  font-weight: 700;
  padding: 0.78571429em 1.5em 0.78571429em;
  line-height: 1em;

  :hover {
    background-color: #cacbcd;
    transition: 0.2s;
  }

  :focus:not(.focus-visible) {
    outline: none;
  }
`;

export default TitleScreen;
