/* @flow */

import * as React from 'react';

import { Root } from '../Root';

export const Input: React$ComponentType<{}> = React.forwardRef((props, ref) => (
  <Root ref={ref} as='input' type='text' mx='1em' {...props} />
));
