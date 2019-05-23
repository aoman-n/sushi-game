/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';

import Layout from './components/Layout';
import Title from './components/Title';
import GameScreenContainer from './containers/GameScreenContainer';

const App: FC = () => (
  <Layout>
    <Title />
    <GameScreenContainer />
  </Layout>
);

export default App;
