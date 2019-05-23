import { combineReducers } from 'redux';
import keyboard, { KeyboardState } from './keyboard';
import player, { PlayerState } from './player';

export interface RootStateType {
  keybord: KeyboardState;
  player: PlayerState;
}

export default combineReducers({
  keyboard,
  player,
});
