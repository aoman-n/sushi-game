import React, { FC, useEffect, useState, KeyboardEvent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootStateType } from '../reducers/index';
import {
  upStart,
  upStop,
  downStart,
  downStop,
  leftStart,
  leftStop,
  rightStart,
  rightStop,
} from '../actions/keyboard';
import {
  generate as generateBullet,
  GenerateParams,
} from '../actions/playerBullet';
import { PlayerState } from '../reducers/player';
import { Bullet } from '../reducers/playerBullet';
import GameScreen from '../components/GameScreen';

interface StateProps {
  player: PlayerState;
  playerBullets: Bullet[];
}

interface DispatchProps {
  upStart: () => void;
  upStop: () => void;
  downStart: () => void;
  downStop: () => void;
  leftStart: () => void;
  leftStop: () => void;
  rightStart: () => void;
  rightStop: () => void;
  generateBullet: (params: GenerateParams) => void;
}

type EnhancedGameScreenProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootStateType): StateProps => ({
  player: state.player,
  playerBullets: state.playerBullet.bullets,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      upStart: () => upStart(),
      upStop: () => upStop(),
      downStart: () => downStart(),
      downStop: () => downStop(),
      leftStart: () => leftStart(),
      leftStop: () => leftStop(),
      rightStart: () => rightStart(),
      rightStop: () => rightStop(),
      generateBullet: (params: GenerateParams) => generateBullet(params),
    },
    dispatch,
  );

/* eslint no-shadow: 0 */
const GameScreenContainer: FC<EnhancedGameScreenProps> = ({
  player,
  playerBullets,
  upStart,
  upStop,
  downStart,
  downStop,
  leftStart,
  leftStop,
  rightStart,
  rightStop,
  generateBullet,
}) => {
  const [bulletCoolTime, updateBulletCoolTime] = useState(0);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      switch (e.code) {
        case 'ArrowLeft':
          leftStart();
          break;
        case 'ArrowRight':
          rightStart();
          break;
        case 'ArrowUp':
          upStart();
          break;
        case 'ArrowDown':
          downStart();
          break;
        case 'KeyZ':
          if (bulletCoolTime === 0) {
            generateBullet({ id: playerBullets.length + 1, ...player });
            updateBulletCoolTime(5);
          } else {
            updateBulletCoolTime(prev => prev - 1);
          }
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', e => {
      switch (e.code) {
        case 'ArrowLeft':
          leftStop();
          break;
        case 'ArrowRight':
          rightStop();
          break;
        case 'ArrowUp':
          upStop();
          break;
        case 'ArrowDown':
          downStop();
          break;
        case 'KeyZ':
          break;
        default:
          break;
      }
    });
  }, []);

  return <GameScreen {...{ player, playerBullets }} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenContainer);
