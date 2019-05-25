/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import sushi from './images/sushi.png';
import { Bullet } from '../reducers/playerBullet';

interface Player {
  x: number;
  y: number;
}

interface GameScreenProps {
  player: Player;
  playerBullets: Bullet[];
}

const GameScreen: FC<GameScreenProps> = ({ player, playerBullets }) => {
  const { x, y } = player;

  return (
    <Container>
      <Screen>
        <PlayerIcon alt="sushi" src={sushi} x={x} y={y} />
        {playerBullets.map(bullet => (
          <PlayerBullet x={bullet.x} y={bullet.y} />
        ))}
      </Screen>
    </Container>
  );
};

interface PlayerIconStyleProps {
  x: number;
  y: number;
}
interface PlayerBulletStyleProps {
  x: number;
  y: number;
}

const Container = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
const Screen = styled.div`
  border: 2px solid gray;
  border-radius: 10px;
  height: 400px;
  width: 700px;
  position: relative;
`;
const PlayerIcon = styled.img<PlayerIconStyleProps>`
  height: 40px;
  width: 40px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;
const PlayerBullet = styled.span<PlayerBulletStyleProps>`
  display: inline-block;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

export default GameScreen;
