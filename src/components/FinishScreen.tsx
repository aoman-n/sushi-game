/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

interface FinishScreenProps {
  startGame: () => void;
}

const FinishScreen: FC<FinishScreenProps> = ({ startGame }) => {
  return (
    <Container>
      <Info>GAME OVER</Info>
      <Button type="button" onClick={startGame}>
        リトライ
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
  flex-direction: column;
`;
const Info = styled.p`
  text-align: center;
  color: #fff;
  font-size: 2em;
  letter-spacing: 6px;
  font-weight: 700;
  text-shadow: 0 10px 10px rgba(0, 0, 0, 0.5);
  margin-bottom: 30px;
`;
const Button = styled.button`
  background: #e0e1e2;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 0.28571429rem;
  font-weight: 700;
  padding: 0.78571429em 1.5em 0.78571429em;
  line-height: 1em;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);

  :hover {
    background-color: #cacbcd;
    transition: 0.2s;
  }

  :focus:not(.focus-visible) {
    outline: none;
  }
`;

export default FinishScreen;
