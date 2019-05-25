/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { LayoutType } from '../reducers/app';
import TitleScreenContainer from '../containers/TitleScreenContainer';
import GameScreenContainer from '../containers/GameScreenContainer';

export interface ScreensProps {
  layout: string;
}

const Screens: FC<ScreensProps> = ({ layout }) => {
  switch (layout) {
    case LayoutType.TITLE_SCREEN:
      return <TitleScreenContainer />;
    case LayoutType.GAME_SCREEN:
      return <GameScreenContainer />;
    case LayoutType.FINISH_SCREEN:
      return <div>finish screen</div>;
    default: {
      return null;
    }
  }
};

export default Screens;
