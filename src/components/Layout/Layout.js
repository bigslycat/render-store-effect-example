/* @flow */

import * as React from 'react';

import { Root } from '../Root';

export const Layout = (props: {}) => (
  <Root width={800} display='flex' flexDirection='column' {...props} />
);
