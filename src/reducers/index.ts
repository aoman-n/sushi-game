import { combineReducers } from 'redux';
import app, { AppState } from './app';
import keyboard, { KeyboardState } from './keyboard';
import player, { PlayerState } from './player';
import playerBullet, { PlayerBulletState } from './playerBullet';
import enemy, { EnemyState } from './enemy';

export interface RootStateType {
  app: AppState;
  keybord: KeyboardState;
  player: PlayerState;
  playerBullet: PlayerBulletState;
  enemy: EnemyState;
}

export default combineReducers({
  app,
  keyboard,
  player,
  playerBullet,
  enemy,
});
