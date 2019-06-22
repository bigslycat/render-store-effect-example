/* @flow */

import * as React from 'react';

import { Root } from '../Root';

export const Form = (props: {}) => (
  <Root as='form' display='flex' {...props} mb={16} />
);
