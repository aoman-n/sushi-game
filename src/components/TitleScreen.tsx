/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { Button } from 'semantic-ui-react';

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

export default TitleScreen;
