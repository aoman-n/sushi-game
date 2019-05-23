/** @jsx jsx */
import { FC } from 'react';
import { jsx } from '@emotion/core';
import styled from '@emotion/styled';

const Title: FC = () => {
  return (
    <Container>
      <Text>Sushi Game!!!</Text>
    </Container>
  );
};

const Container = styled.div`
  height: 100px;
`;
const Text = styled.h1`
  color: gray;
  height: 100%;
  line-height: 100px;
  text-align: center;
`;

export default Title;
