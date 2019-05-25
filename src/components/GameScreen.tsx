/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
import sushi from './images/player.png';
import { Bullet } from '../reducers/playerBullet';
import { Enemy } from '../reducers/enemy';

interface Player {
  x: number;
  y: number;
}

interface GameScreenProps {
  player: Player;
  playerBullets: Bullet[];
  enemies: Enemy[];
}

const GameScreen: FC<GameScreenProps> = ({
  player,
  playerBullets,
  enemies,
}) => {
  const { x, y } = player;

  return (
    <Container>
      <Screen>
        <PlayerIcon alt="sushi" src={sushi} x={x} y={y} />
        {playerBullets.map(bullet => (
          <PlayerBullet key={bullet.id} x={bullet.x} y={bullet.y}>
            .
          </PlayerBullet>
        ))}
        {enemies.map(enemy => (
          <EnemyIcon
            key={enemy.id}
            x={enemy.x}
            y={enemy.y}
            alt="sushi"
            src={sushi}
          />
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
interface EnemyStyleProps {
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
  background: #fafad2;
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
  font-size: 30px;
  color: green;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;
const EnemyIcon = styled.img<EnemyStyleProps>`
  height: 20px;
  width: 20px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

export default GameScreen;
