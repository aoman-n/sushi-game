/** @jsx jsx */
import { FC, ReactNode } from 'react';
import { jsx } from '@emotion/core';
import HtmlTitle from './HtmlTitle';

interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ title = 'sushi game', children }) => (
  <div>
    <HtmlTitle title={title} />
    {children}
  </div>
);

export default Layout;
