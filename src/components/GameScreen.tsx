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
        <WindowFrame>
          <WindowHeader />
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
        </WindowFrame>
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
  height: 400px;
  width: 700px;
`;
const WindowFrame = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  margin-top: 5px;
  padding-top: 30px;
  border: solid 5px #ddd;
  border-top: 0;
  border-radius: 4px;
  background: #fcf1d3;
`;
const WindowHeader = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  background: #ddd
    url(https://webliker.info/wp-content/themes/template/img/common/dot-browser.png)
    no-repeat left 10px top 50%;
  background-size: 40px;
  padding: 10px 0;
  width: 100%;
  height: 30px;
  display: block;
`;
const PlayerIcon = styled.img<PlayerIconStyleProps>`
  height: 40px;
  width: 40px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;
const PlayerBullet = styled.img<PlayerBulletStyleProps>`
  height: 20px;
  width: 20px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;
const EnemyIcon = styled.img<EnemyStyleProps>`
  height: 30px;
  width: 30px;
  position: absolute;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
`;

export default GameScreen;
