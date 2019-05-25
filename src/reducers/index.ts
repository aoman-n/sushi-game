import { combineReducers } from 'redux';
import keyboard, { KeyboardState } from './keyboard';
import player, { PlayerState } from './player';
import playerBullet, { PlayerBulletState } from './playerBullet';

export interface RootStateType {
  keybord: KeyboardState;
  player: PlayerState;
  playerBullet: PlayerBulletState;
}

export default combineReducers({
  keyboard,
  player,
  playerBullet,
});
