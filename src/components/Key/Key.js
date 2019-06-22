/* @flow */

import * as React from 'react';

import { Root } from '../Root';
import { Button } from '../Button';

export const Key = (props: {}) => (
  <Root
    as='span'
    css={{
      ':before': { content: '"["' },
      ':after': { content: '"]"' },
      [`${Button.toString()}:not([disabled]) &`]: { color: '#999' },
    }}
    {...props}>
    Enter
  </Root>
);
