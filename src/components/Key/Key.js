/* @flow */

import * as React from 'react';
import styled from '@emotion/styled';

import { Root } from '../Root';
import { Button } from '../Button';

export const Key = styled((props: {}) => (
  <Root
    as='span'
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
