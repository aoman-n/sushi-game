/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

import Layout from './components/Layout';
import Title from './components/Title';
import ScreensContainer from './containers/ScreensContainer';
// import GameScreenContainer from './containers/GameScreenContainer';

import { gameScreenSize } from './config';

const App: FC = () => (
  <Layout>
    <Title />
    <Main>
      <WindowFrame>
        <WindowHeader />
        <ScreensContainer />
        {/* <GameScreenContainer /> */}
      </WindowFrame>
    </Main>
  </Layout>
);

const Main = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`;
const WindowFrame = styled.div`
  position: relative;
  height: ${gameScreenSize.height}px;
  width: ${gameScreenSize.width}px;
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
  box-sizing: border-box;
`;

export default App;
