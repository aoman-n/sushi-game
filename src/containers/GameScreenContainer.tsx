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
import GameScreen from '../components/GameScreen';

interface StateProps {
  player: { x: number; y: number };
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
}

type EnhancedGameScreenProps = StateProps & DispatchProps;

const mapStateToProps = (state: RootStateType): StateProps => ({
  player: state.player,
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
    },
    dispatch,
  );

/* eslint no-shadow: 0 */
const GameScreenContainer: FC<EnhancedGameScreenProps> = ({
  player,
  upStart,
  upStop,
  downStart,
  downStop,
  leftStart,
  leftStop,
  rightStart,
  rightStop,
}) => {
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
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', (e => {
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

  return <GameScreen {...{ player }} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreenContainer);
