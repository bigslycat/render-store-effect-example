/* @flow */

import * as React from 'react';
import styled from '@emotion/styled';

import { Root } from '../Root';

export const Key = styled((props: {}) => (
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
))`
  ${Button.toString()}:not([disabled]) & {
    color: #999;
  }
  :before {
    content: '[';
  }
  :after {
    content: ']';
  }
`;
