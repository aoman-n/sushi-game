import { combineReducers } from 'redux';
import keyboard, { KeyboardState } from './keyboard';
import player, { PlayerState } from './player';
import playerBullet, { PlayerBulletState } from './playerBullet';
import enemy, { EnemyState } from './enemy';

export interface RootStateType {
  keybord: KeyboardState;
  player: PlayerState;
  playerBullet: PlayerBulletState;
  enemy: EnemyState;
}

export default combineReducers({
  keyboard,
  player,
  playerBullet,
  enemy,
});
