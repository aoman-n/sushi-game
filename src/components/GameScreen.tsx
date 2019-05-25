/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';
/* image icon */
import playerImg from './images/player.png';
import playerBulletImg from './images/playerBullet.png';
import enemyImg from './images/enemy.png';
/* types */
import { Bullet } from '../reducers/playerBullet';
import { Enemy } from '../reducers/enemy';
/* other */
import { playerSize, playerBulletSize, enemySize } from '../config';

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
      <PlayerIcon alt="player" src={playerImg} x={x} y={y} />
      {playerBullets.map(bullet => (
        <PlayerBullet
          key={bullet.id}
          src={playerBulletImg}
          alt="bullet"
          x={bullet.x}
          y={bullet.y}
        />
      ))}
      {enemies.map(enemy => (
        <EnemyIcon
          key={enemy.id}
          x={enemy.x}
          y={enemy.y}
          alt="enemy"
          src={enemyImg}
        />
      ))}
    </Container>
  );
};

interface PositionStyleProps {
  x: number;
  y: number;
}

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;
const PlayerIcon = styled.img<PositionStyleProps>`
  display: block;
  height: ${playerSize}px;
  width: ${playerSize}px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;
const PlayerBullet = styled.img<PositionStyleProps>`
  height: ${playerBulletSize}px;
  width: ${playerBulletSize}px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;
const EnemyIcon = styled.img<PositionStyleProps>`
  height: ${enemySize}px;
  width: ${enemySize}px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

export default GameScreen;
